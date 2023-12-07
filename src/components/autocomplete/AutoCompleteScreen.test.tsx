import { RenderResult, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { SearchProvider } from '../../contexts/Search/SearchProvider'
import { ElementSize } from '../../hooks/useElementSize'
import { DataBaseEntry } from '../../models/Database'
import { AutoCompleteScreen } from './AutoCompleteScreen'

const mocks = vi.hoisted(() => ({
  useSearchList: vi.fn(),
  useElementSize: vi.fn(),
}))

vi.mock('../../hooks/api/useSearchList', async (importActual) => {
  const actual = await importActual<typeof import('../../hooks/api/useSearchList')>()
  return {
    ...actual,
    useSearchList: mocks.useSearchList,
  }
})

vi.mock('../../hooks/useElementSize', async () => {
  const actual = await vi.importActual('../../hooks/useElementSize')
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

    mocks.useSearchList.mockReturnValue({ searchListResponse, isSearchListLoading: true, searchListError: undefined })
  })

  afterEach(() => {
    cleanup()
  })

  test('renders autocomplete component with an input field', () => {
    const { getByPlaceholderText } = render(
      <SearchProvider>
        <AutoCompleteScreen onSelect={vi.fn()} searchValue='' setSearchValue={vi.fn()} />
      </SearchProvider>,
    )
    // use this to view what is being rendered
    // screen.debug()

    expect(getByPlaceholderText('Type to filter list...')).toBeDefined()
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
      fireEvent.submit(inputElement)
    })
    screen.debug()

    expect(inputElement).toHaveValue('WQHD')
    expect(container.querySelectorAll('li').length).toEqual(1)
  })

  test('renders the autocomplete dropdown with no items when input does not match', () => {
    const { getByTestId, container } = render(
      <SearchProvider>
        <AutoCompleteScreen onSelect={vi.fn()} searchValue='' setSearchValue={vi.fn()} />
      </SearchProvider>,
    )

    const inputElement = getByTestId('autoCompleteInput')

    // Type 'a' in the input field

    fireEvent.change(inputElement, {
      target: {
        value: 'AAAA',
      },
    })

    expect(inputElement).toHaveValue('AAAA')
    expect(container.querySelectorAll('li').length).toEqual(0)
  })
})
