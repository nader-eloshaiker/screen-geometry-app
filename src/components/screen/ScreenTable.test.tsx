import { NotificationProvider } from '@contexts/Notification/NotificationProvider'
import { QueryProvider } from '@contexts/Query/QueryProvider'
import { useElementSizeMock } from '@hooks/useElementSize.mock'
import { ScreenItem } from '@openapi/generated/models'
import { getGetScreenListMock, getScreenListServiceMock } from '@openapi/generated/services/screen-list-service'
import { getScreenServiceMock } from '@openapi/generated/services/screen-service'
import { useInteractComponent } from '@test/utils/useInteractComponent'
import { resetMSWEventStack, useMSWEventStack } from '@test/utils/useMSWEventStack'
import { waitFor } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { ScreenTable } from './ScreenTable'

const TestComponent = ({
  screens,
  isScreenListLoading = false,
}: {
  screens?: Array<ScreenItem>
  isScreenListLoading?: boolean
}) => {
  return (
    <QueryProvider>
      <NotificationProvider>
        <ScreenTable screens={screens ?? getGetScreenListMock().list} isScreenListLoading={isScreenListLoading} />
      </NotificationProvider>
    </QueryProvider>
  )
}

describe('#ScreenTable', () => {
  const server = setupServer(...getScreenListServiceMock(), ...getScreenServiceMock())
  const mswRequestEventSpy = useMSWEventStack(server)

  beforeAll(() => {
    server.listen()
  })

  beforeEach(() => {
    server.resetHandlers()
    server.restoreHandlers()
    useElementSizeMock()
    resetMSWEventStack()
  })

  afterAll(() => {
    server.close()
  })

  test('renders screen table component with a table and rows', async () => {
    const test = useInteractComponent(<TestComponent />)

    const tableElement = await test.findByRole('table')
    expect(tableElement).toBeDefined()

    const rowElements = await test.findAllByRole('row')
    expect(rowElements.length).toBe(5)

    const colElements = await test.findAllByRole('columnheader')
    expect(colElements.length).toBe(7)
  })

  test('remove a screen row when delete button is clicked', async () => {
    const test = useInteractComponent(<TestComponent />)

    const deleteElements = await test.findAllByLabelText('delete button')
    const deleteElement = deleteElements[0]

    await test.user.click(deleteElement)

    expect(mswRequestEventSpy[mswRequestEventSpy.length - 1]).toEqual(
      expect.stringContaining('method:DELETE|url:http://localhost:3000/undefined/v1/screen/pVesw1Iu'),
    )

    waitFor(() => {
      const rowElements = test.queryAllByRole('row')
      expect(rowElements.length).toBe(4)
    })
  })
  test('hide a screen row when show button is clicked', async () => {
    const test = useInteractComponent(<TestComponent />)

    const showElements = await test.findAllByLabelText('show checkbox')
    const showElement = showElements[0]

    await test.user.click(showElement)

    console.log('mswRequestEventSpy', mswRequestEventSpy)

    expect(mswRequestEventSpy[mswRequestEventSpy.length - 1]).toEqual(
      expect.stringContaining('method:PATCH|url:http://localhost:3000/undefined/v1/screen/pVesw1Iu/show'),
    )
  })

  test('show skeleton table when screen list is loading', async () => {
    const test = useInteractComponent(<TestComponent screens={[]} isScreenListLoading={true} />)

    const tableElement = await test.findByRole('table')
    expect(tableElement).toBeDefined()

    const rowElements = await test.findAllByTestId('SkeletonTableRow')
    expect(rowElements.length).toBe(5)

    const colElements = await test.findAllByRole('columnheader')
    expect(colElements.length).toBe(7)
  })
})
