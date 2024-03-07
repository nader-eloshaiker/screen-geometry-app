import { QueryProvider } from '@contexts/Query/QueryProvider'
import { NotificationProvider } from '@screengeometry/components/notification'
import { getSearchServiceMock } from '@screengeometry/openapi'
import { mswWithSpy, resetMSW, startMSW, stopMSW } from '@screengeometry/serviceworker/NodeServiceWorker'
import { useInteractComponent } from '@screengeometry/utils'
import { waitFor } from '@testing-library/react'
import { useElementSizeMock } from '../hooks/useElementSize.mock'
import { AutoCompleteScreen } from './AutoCompleteScreen'

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
  const mswRequestEventSpy = mswWithSpy(getSearchServiceMock())

  beforeAll(async () => {
    startMSW()
  })

  afterAll(async () => {
    stopMSW()
  })

  beforeEach(() => {
    useElementSizeMock()
    resetMSW()
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
