import { act, cleanup, fireEvent, render, RenderResult, screen, waitFor } from '@testing-library/react'
import { AxiosResponse } from 'axios'
import { RefObject } from 'react'
import { afterEach, beforeEach, describe, expect, Mock, vi } from 'vitest'
import { ElementSize, useElementSize } from '../../hooks/useElementSize'
import { DataBaseEntry } from '../../models/Database'
import AutoCompleteScreen from './AutoCompleteScreen'

const mocks = vi.hoisted(() => ({
  axios: {
    get: vi.fn(),
    post: vi.fn(),
    request: vi.fn(),
    // and any other request type you want to mock
  },
}))

vi.mock('axios', async (importActual) => {
  const actual = await importActual<typeof import('axios')>()
  return {
    default: {
      ...actual.default,
      create: vi.fn(() => ({
        ...actual.default.create(),
        get: mocks.axios.get,
        post: mocks.axios.post,
        request: mocks.axios.request,
      })),
    },
  }
})

vi.mock('../../hooks/useElementSize', async () => {
  const actual = await vi.importActual('../../hooks/useElementSize')
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(actual as any),
    useElementSize: vi.fn(),
  }
})

describe('AutoCompleteScreen', () => {
  // let searchContextSpy

  beforeEach(() => {
    const useElementSizeResponse: ElementSize = {
      width: 1024,
      height: 1024,
      x: 0,
      y: 0,
    }
    const useElementSizeMock = useElementSize as Mock<[target: RefObject<HTMLElement>], ElementSize>
    useElementSizeMock.mockImplementation(() => useElementSizeResponse)

    const axiosRequestResponse = {
      data: [
        {
          name: 'WQHD',
          size: 34,
          width: 3440,
          height: 1440,
          aspectRatio: '21:9',
        },
        {
          name: 'WQHD+',
          size: 38,
          width: 3840,
          height: 1600,
          aspectRatio: '21:9',
        },
        {
          name: '4K UHD',
          size: 27,
          width: 3840,
          height: 2160,
          aspectRatio: '16:9',
        },
        {
          name: '4K UHD',
          size: 32,
          width: 3840,
          height: 2160,
          aspectRatio: '16:9',
        },
      ],
    } as AxiosResponse<DataBaseEntry[]>
    mocks.axios.request.mockResolvedValue(axiosRequestResponse)
  })

  afterEach(() => {
    cleanup()
  })

  test.skip('renders autocomplete component with an input field', async () => {
    await waitFor(() => render(<AutoCompleteScreen onSelect={vi.fn()} />))
    // use this to view what is being rendered
    // screen.debug()

    expect(screen.getByPlaceholderText('Type to filter list...')).toBeInTheDocument()
  })

  test.skip('fetches data from API and updates the context', async () => {
    act(() => render(<AutoCompleteScreen onSelect={vi.fn()} />))

    // Verify that the loading indicator is displayed
    expect(screen.getByText('Loading...')).toBeDefined()

    // Verify that the context is updated with the fetched data
    expect(screen.getByPlaceholderText('Type to filter list...')).toBeDefined()
    expect(screen.getByPlaceholderText('Type to filter list...')).toEqual('')
  })

  test('updates the context when the input value changes', async () => {
    const { getByTestId } = await waitFor<RenderResult>(() => render(<AutoCompleteScreen onSelect={vi.fn()} />))

    const inputElement = getByTestId('autoCompleteInput')
    const containerElement = getByTestId('autoComplete')
    // const inputElement = getByPlaceholderText('Type to filter list...')

    await waitFor(() => {
      fireEvent.change(inputElement, {
        target: {
          value: 'WQHD+',
        },
      })
    })

    await waitFor(() => {
      fireEvent.click(containerElement)
    })

    expect(inputElement).toHaveValue('WQHD+')
  })

  test.skip('renders the autocomplete dropdown with no items when input is empty', async () => {
    await waitFor(() => render(<AutoCompleteScreen onSelect={vi.fn()} />))
    const inputElement: HTMLInputElement = screen.getByTestId('SearchInput')
    // const inputElement: HTMLInputElement = screen.getByPlaceholderText('Type to filter list...')

    // Type 'a' in the input field
    await waitFor(() => {
      fireEvent.change(inputElement, {
        target: {
          value: 'WQHD+',
        },
      })
    })

    // Clear the input field
    await waitFor(() => {
      fireEvent.change(inputElement, {
        target: {
          value: '',
        },
      })
    })

    // Verify that the autocomplete dropdown is not rendered
    expect(screen.queryByRole('listbox')).toBeNull()
  })
})
