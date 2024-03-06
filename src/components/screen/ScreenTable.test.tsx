import { QueryProvider } from '@contexts/Query/QueryProvider'
import { useElementSizeMock } from '@hooks/useElementSize.mock'
import {
  ScreenItem,
  getGetScreenListMock,
  getScreenListServiceMock,
  getScreenServiceMock,
} from '@screengeometry/openapi'
import { mswWithSpy, resetMSW, startMSW, stopMSW } from '@screengeometry/serviceworker/NodeServiceWorker'
import { useInteractComponent } from '@test/utils/useInteractComponent'
import { waitFor } from '@testing-library/react'
import { NotificationProvider } from 'packages/components/src/notification/context/NotificationProvider'
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
  const mswRequestEventSpy = mswWithSpy([...getScreenServiceMock(), ...getScreenListServiceMock()])

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
      expect.stringContaining('method:DELETE|url:http://dev.api.screengeometry.com/v1/screen/pVesw1Iu'),
    )

    waitFor(() => expect(test.queryAllByRole('row').length).toBe(4))
  })
  test('hide a screen row when show button is clicked', async () => {
    const test = useInteractComponent(<TestComponent />)

    const showElements = await test.findAllByLabelText('show checkbox')
    const showElement = showElements[0]

    await test.user.click(showElement)

    expect(mswRequestEventSpy[mswRequestEventSpy.length - 1]).toEqual(
      expect.stringContaining('method:PATCH|url:http://dev.api.screengeometry.com/v1/screen/pVesw1Iu/show'),
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
