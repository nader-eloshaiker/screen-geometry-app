import { NotificationProvider } from '@contexts/Notification/NotificationProvider'
import { useElementSizeMock } from '@hooks/useElementSize.mock'
import { useSearchListActionMock } from '@openapi/mocks/useSearchList.mock'
import { useInteractComponent } from '@test/utils/useInteractComponent'
import { render } from '@testing-library/react'
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

  test('updates the context when the input value changes', async () => {
    const { user, getByPlaceholderText, container } = useInteractComponent(
      <NotificationProvider>
        <AutoCompleteScreen onSelectScreen={vi.fn()} setClearSearchHandler={vi.fn} />
      </NotificationProvider>,
    )

    const inputElement = getByPlaceholderText('Type to filter list...')
    await user.type(inputElement, 'WQHD')

    expect(inputElement).toHaveValue('WQHD')
    expect(container.querySelectorAll('li').length).toEqual(2)
  })

  test('renders the autocomplete dropdown with no items when input does not match', async () => {
    const { user, getByPlaceholderText, container } = useInteractComponent(
      <NotificationProvider>
        <AutoCompleteScreen onSelectScreen={vi.fn()} />
      </NotificationProvider>,
    )

    const inputElement = getByPlaceholderText('Type to filter list...')
    await user.type(inputElement, 'AAAA')

    expect(inputElement).toHaveValue('AAAA')
    expect(container.querySelectorAll('li').length).toEqual(0)
  })
})
