import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import { AxiosResponse } from 'axios'
import { RefObject } from 'react'
import { afterEach, beforeEach, describe, expect, Mock, vi } from 'vitest'
import { SearchProvider } from '../../contexts/Search/SearchProvider'
import { ElementSize, useElementSize } from '../../hooks/useElementSize'
import { DataBaseEntry } from '../../models/Database'
import { AutoCompleteScreen } from './AutoCompleteScreen'

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
    const { getByPlaceholderText } = await waitFor<RenderResult>(() =>
      render(
        <SearchProvider>
          <AutoCompleteScreen onSelect={vi.fn()} searchValue='' setSearchValue={vi.fn()} />
        </SearchProvider>,
      ),
    )
    // use this to view what is being rendered
    // screen.debug()

    expect(getByPlaceholderText('Type to filter list...')).toBeInTheDocument()
  })

  test.skip('fetches data from API and updates the context', async () => {
    const { getByText, getByPlaceholderText } = await waitFor<RenderResult>(() =>
      render(
        <SearchProvider>
          <AutoCompleteScreen onSelect={vi.fn()} searchValue='' setSearchValue={vi.fn()} />
        </SearchProvider>,
      ),
    )

    // Verify that the loading indicator is displayed
    // need to understand how to test this
    expect(getByText('Loading...')).toBeDefined()

    expect(getByPlaceholderText('Type to filter list...')).toBeInTheDocument()
  })

  test('updates the context when the input value changes', async () => {
    const { getByTestId, container } = await waitFor<RenderResult>(() =>
      render(
        <SearchProvider>
          <AutoCompleteScreen onSelect={vi.fn()} searchValue='' setSearchValue={vi.fn()} />
        </SearchProvider>,
      ),
    )

    const inputElement = getByTestId('autoCompleteInput')

    await waitFor(() => {
      fireEvent.change(inputElement, {
        target: {
          value: 'WQHD+',
        },
      })
    })

    expect(inputElement).toHaveValue('WQHD+')
    expect(container.querySelectorAll('li').length).toEqual(1)
  })

  test('renders the autocomplete dropdown with no items when input does not match', async () => {
    const { getByTestId, container } = await waitFor<RenderResult>(() =>
      render(
        <SearchProvider>
          <AutoCompleteScreen onSelect={vi.fn()} searchValue='' setSearchValue={vi.fn()} />
        </SearchProvider>,
      ),
    )

    const inputElement = getByTestId('autoCompleteInput')

    // Type 'a' in the input field
    await waitFor(() => {
      fireEvent.change(inputElement, {
        target: {
          value: 'AAAA',
        },
      })
    })

    expect(inputElement).toHaveValue('AAAA')
    expect(container.querySelectorAll('li').length).toEqual(0)
  })
})
