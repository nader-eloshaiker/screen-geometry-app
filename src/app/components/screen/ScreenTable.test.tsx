import { QueryProvider } from '@app/contexts/Query/QueryProvider'

import { ScreenItemRender } from '@app/models/screenItemRender'
import {
  getGetScreenListMock,
  getScreenListServiceMock,
  getScreenServiceMock,
  getSearchServiceMock,
} from '@packages/openapi/generated'
import { mswWithSpy, resetMSW, startMSW, stopMSW } from '@packages/serviceworker/NodeServiceWorker'
import { renderWithUserEvents } from '@packages/test/utils/RenderWithUserEvents'
import { useElementSizeMock } from '@packages/ui/hooks/useElementSize.mock'
import { NotificationProvider } from '@packages/ui/notification'
import { normaliseScreenRender } from '@packages/utils'
import { act, waitFor } from '@testing-library/react'
import { ScreenTable } from './ScreenTable'

const TestComponent = ({
  screens,
  isScreenListLoading = false,
}: {
  screens?: Array<ScreenItemRender>
  isScreenListLoading?: boolean
}) => {
  return (
    <QueryProvider>
      <NotificationProvider>
        <ScreenTable
          screens={screens ?? normaliseScreenRender(getGetScreenListMock().list)}
          isScreenListLoading={isScreenListLoading}
        />
      </NotificationProvider>
    </QueryProvider>
  )
}

describe('#ScreenTable', () => {
  const mswRequestEventSpy = mswWithSpy([
    ...getSearchServiceMock(),
    ...getScreenListServiceMock(),
    ...getScreenServiceMock(),
  ])

  beforeAll(async () => {
    await startMSW()
  })

  afterAll(async () => {
    await stopMSW()
  })

  beforeEach(() => {
    useElementSizeMock()
    resetMSW()
  })

  test('renders screen table component with a table and rows', async () => {
    const test = await renderWithUserEvents(<TestComponent />)

    const tableElement = await test.findByRole('table')
    expect(tableElement).toBeDefined()

    const rowElements = await test.findAllByRole('row')
    expect(rowElements.length).toBe(5)

    const colElements = await test.findAllByRole('columnheader')
    expect(colElements.length).toBe(7)
  })

  test('remove a screen row when delete button is clicked', async () => {
    const test = await renderWithUserEvents(<TestComponent />)

    const deleteElements = await test.findAllByLabelText('delete button')
    const deleteElement = deleteElements[0] as HTMLElement

    await act(async () => {
      await test.user.click(deleteElement)
    })

    expect(mswRequestEventSpy[mswRequestEventSpy.length - 1]).toEqual(
      expect.stringContaining('method:DELETE|url:http://dev.api.screengeometry.com/v1/screen/'),
    )

    waitFor(() => expect(test.queryAllByRole('row').length).toBe(4))
  })
  test('hide a screen row when show button is clicked', async () => {
    const test = await renderWithUserEvents(<TestComponent />)

    const showElements = await test.findAllByLabelText('show checkbox')
    const showElement = showElements[0] as HTMLElement

    await act(async () => {
      await test.user.click(showElement)
    })

    expect(mswRequestEventSpy[mswRequestEventSpy.length - 1]).toEqual(
      expect.stringContaining('method:PATCH|url:http://dev.api.screengeometry.com/v1/screen/'),
    )
    expect(mswRequestEventSpy[mswRequestEventSpy.length - 1]).toEqual(expect.stringContaining('/show'))
  })

  test('show skeleton table when screen list is loading', async () => {
    const test = await renderWithUserEvents(<TestComponent screens={[]} isScreenListLoading={true} />)

    const tableElement = await test.findByRole('table')
    expect(tableElement).toBeDefined()

    const rowElements = await test.findAllByTestId('SkeletonTableRow')
    expect(rowElements.length).toBe(5)

    const colElements = await test.findAllByRole('columnheader')
    expect(colElements.length).toBe(7)
  })
})
