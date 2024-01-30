import { AutoCompleteScreen } from '@components/auto-complete/AutoCompleteScreen'
import { NotificationProvider } from '@contexts/Notification/NotificationProvider'
import { QueryProvider } from '@contexts/Query/QueryProvider'
import { useElementSizeMock } from '@hooks/useElementSize.mock'
import { getSearchListServiceMock } from '@openapi/generated/services/search-list-service'
import { useInteractComponent } from '@test/utils/useInteractComponent'
import { resetMSWEventStack, useMSWEventStack } from '@test/utils/useMSWEventStack'
import { waitFor } from '@testing-library/react'
import { setupServer } from 'msw/node'

const TestComponent = () => {
  return (
    <QueryProvider>
      <NotificationProvider>
        <AutoCompleteScreen onSelectScreen={vi.fn()} setClearSearchHandler={vi.fn} />
      </NotificationProvider>
    </QueryProvider>
  )
}

describe('#AutoCompleteScreen', () => {
  const server = setupServer(...getSearchListServiceMock())
  const mswRequestEventSpy = useMSWEventStack(server)

  beforeAll(() => {
    server.listen()
  })

  beforeEach(() => {
    useElementSizeMock()
    resetMSWEventStack()
  })

  afterEach(() => {
    server.resetHandlers()
    server.restoreHandlers()
  })

  afterAll(() => {
    server.close()
  })

  test('renders autocomplete component with an input field', async () => {
    const test = useInteractComponent(<TestComponent />)

    const inputElement = await test.findByPlaceholderText('Type to filter list...')
    expect(inputElement).toBeDefined()
  })

  test('calls backend search api a limited time as the user enters a search term', async () => {
    const test = useInteractComponent(<TestComponent />)

    const inputElement = await test.findByPlaceholderText('Type to filter list...')
    expect(inputElement).toBeDefined()
    await test.user.type(inputElement, 'WQHD')

    await waitFor(() => {
      expect(mswRequestEventSpy[mswRequestEventSpy.length - 1]).toEqual(
        expect.stringContaining('/v1/search?term=WQHD'), // expect.stringMatching(/\/v1\/search\?term=WQHD$/i),
      )
    })
  })

  test('clears search results and requests a full list from search engine', async () => {
    const test = useInteractComponent(<TestComponent />)

    const inputElement = await test.findByPlaceholderText('Type to filter list...')
    await test.user.type(inputElement, 'WQHD')

    await waitFor(() => {
      expect(mswRequestEventSpy[mswRequestEventSpy.length - 1]).toEqual(expect.stringContaining('/v1/search?term=WQHD'))
    })

    const clearButton = await test.findByRole('reset')
    await test.user.click(clearButton)

    await waitFor(() => {
      expect(mswRequestEventSpy[mswRequestEventSpy.length - 1]).toEqual(expect.stringContaining('/v1/search?term='))
    })
  })
})
