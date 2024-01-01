import { NotificationProvider } from '@contexts/Notification/NotificationProvider'
import { useElementSizeMock } from '@hooks/useElementSize.mock'
import { useSearchListActionMock } from '@openapi/mocks/useSearchList.mock'
import { fireEvent, render } from '@testing-library/react'
import { AutoCompleteScreen } from './AutoCompleteScreen'

describe('#AutoCompleteScreen', () => {
  // let searchContextSpy

  beforeEach(() => {
    useElementSizeMock()
    useSearchListActionMock()
  })

  test('renders autocomplete component with an input field', () => {
    const { getByPlaceholderText } = render(
      <NotificationProvider>
        <AutoCompleteScreen onSelectScreen={vi.fn()} setClearSearchHandler={vi.fn} />
      </NotificationProvider>,
    )
    // use this to view what is being rendered
    // screen.debug()

    expect(getByPlaceholderText('Type to filter list...')).toBeDefined()
  })

  test('updates the context when the input value changes', () => {
    const { getByPlaceholderText, container } = render(
      <NotificationProvider>
        <AutoCompleteScreen onSelectScreen={vi.fn()} setClearSearchHandler={vi.fn} />
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
        <AutoCompleteScreen onSelectScreen={vi.fn()} onReset='' />
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
