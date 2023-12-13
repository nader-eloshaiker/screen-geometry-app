import { NotificationProvider } from '@contexts/Notification/NotificationProvider'
import { SearchProvider } from '@contexts/Search/SearchProvider'
import { useSearchListAction } from '@hooks/api/useSearchListAction'
import { ElementSize } from '@hooks/useElementSize'
import { DataBaseEntry } from '@models/Database'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, vi } from 'vitest'
import { AutoCompleteScreen } from './AutoCompleteScreen'

const mocks = vi.hoisted(() => ({
  useSearchListAction: vi.fn(),
  useElementSize: vi.fn(),
}))

vi.mock('../../hooks/api/useSearchListAction', async (importActual) => {
  const actual = await importActual<typeof useSearchListAction>()
  return {
    ...actual,
    useSearchListAction: mocks.useSearchListAction,
  }
})

vi.mock('@hooks/useElementSize', async () => {
  const actual = await vi.importActual('@hooks/useElementSize')
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(actual as any),
    useElementSize: mocks.useElementSize,
  }
})

describe('#AutoCompleteScreen', () => {
  // let searchContextSpy

  beforeEach(() => {
    const useElementSizeResponse: ElementSize = {
      width: 1024,
      height: 1024,
      x: 0,
      y: 0,
    }
    mocks.useElementSize.mockImplementation(() => useElementSizeResponse)

    const searchListResponse: DataBaseEntry[] = [
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
    ]

    mocks.useSearchListAction.mockReturnValue({ data: searchListResponse, isFetching: false, error: undefined })
  })

  afterEach(() => {
    cleanup()
  })

  test('renders autocomplete component with an input field', () => {
    const { getByPlaceholderText } = render(
      <NotificationProvider>
        <SearchProvider>
          <AutoCompleteScreen onSelect={vi.fn()} onReset='' />
        </SearchProvider>
      </NotificationProvider>,
    )
    // use this to view what is being rendered
    // screen.debug()

    expect(getByPlaceholderText('Type to filter list...')).toBeDefined()
  })

  test('updates the context when the input value changes', () => {
    const { getByPlaceholderText, container } = render(
      <NotificationProvider>
        <SearchProvider>
          <AutoCompleteScreen onSelect={vi.fn()} onReset='' />
        </SearchProvider>
      </NotificationProvider>,
    )

    const inputElement = getByPlaceholderText('Type to filter list...')
    fireEvent.change(inputElement, {
      target: {
        value: 'WQHD',
      },
    })

    expect(inputElement).toHaveValue('WQHD')
    expect(container.querySelectorAll('li').length).toEqual(2)
  })

  test('renders the autocomplete dropdown with no items when input does not match', () => {
    const { getByPlaceholderText, container } = render(
      <NotificationProvider>
        <SearchProvider>
          <AutoCompleteScreen onSelect={vi.fn()} onReset='' />
        </SearchProvider>
      </NotificationProvider>,
    )

    const inputElement = getByPlaceholderText('Type to filter list...')
    fireEvent.change(inputElement, {
      target: {
        value: 'AAAA',
      },
    })

    expect(inputElement).toHaveValue('AAAA')
    expect(container.querySelectorAll('li').length).toEqual(0)
  })
})
