import { NotificationProvider } from '@contexts/Notification/NotificationProvider'
import { SearchProvider } from '@contexts/Search/SearchProvider'
import { useElementSizeMock } from '@hooks/useElementSize.mock'
import { useSearchListActionMock } from '@openapi/mocks/useSearchListAction.mock'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { AutoCompleteScreen } from './AutoCompleteScreen'

// const mocks = vi.hoisted(() => ({
//   useSearchListAction: mockUseSearchListAction(),
// }))

describe('#AutoCompleteScreen', () => {
  // let searchContextSpy

  beforeEach(() => {
    useElementSizeMock()
    useSearchListActionMock()
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
