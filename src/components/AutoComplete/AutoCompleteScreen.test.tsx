import { NotificationProvider } from '@contexts/Notification/NotificationProvider'
import { useElementSizeMock } from '@hooks/useElementSize.mock'
import { useSearchListActionMock } from '@openapi/mocks/useSearchList.mock'
import { useInteractComponent } from '@test/utils/useInteractComponent'
import { getByRole, render, waitFor } from '@testing-library/react'
import { SpyInstance } from 'vitest'
import { AutoCompleteScreen } from './AutoCompleteScreen'

describe('#AutoCompleteScreen', () => {
  let searchContextSpy: SpyInstance

  beforeEach(() => {
    useElementSizeMock()
    searchContextSpy = useSearchListActionMock()
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

  test('calls backend search api a limited time as the user enters a search term', async () => {
    const { user, getByPlaceholderText } = useInteractComponent(
      <NotificationProvider>
        <AutoCompleteScreen onSelectScreen={vi.fn()} setClearSearchHandler={vi.fn} />
      </NotificationProvider>,
    )

    const inputElement = getByPlaceholderText('Type to filter list...')
    await user.type(inputElement, 'WQHD')

    waitFor(() => {
      const spyCalls = searchContextSpy.mock.calls
      expect(spyCalls.length).toBe(2)
      expect(spyCalls[1][0]).toBe({ term: 'WQHD' })
    })
  })

  test('clears search results and requests a full list from search engine', async () => {
    const { user, getByPlaceholderText, container } = useInteractComponent(
      <NotificationProvider>
        <AutoCompleteScreen onSelectScreen={vi.fn()} setClearSearchHandler={vi.fn} />
      </NotificationProvider>,
    )

    const inputElement = getByPlaceholderText('Type to filter list...')
    await user.type(inputElement, 'WQHD')

    waitFor(() => {
      expect(searchContextSpy.mock.calls.length).toBe(2)
    })

    const clearButton = getByRole(container, 'reset')
    await user.click(clearButton)

    waitFor(() => {
      expect(searchContextSpy.mock.calls.length).toBe(3)
      expect(searchContextSpy.mock.calls[2][0]).toBe({ term: '' })
    })
  })
})
