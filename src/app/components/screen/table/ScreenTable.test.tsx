import { QueryProvider } from '@/app/contexts/Query/QueryProvider'

import { ScreenProvider } from '@/app/contexts/Screen/ScreenProvider'
import { ScreenItemRender } from '@/app/models/screenItemRender'
import { Screens } from '@/app/pages/Screens'
import {
  getGetScreenListResponseMock,
  getScreenListServiceMock,
  getScreenServiceMock,
  getSearchServiceMock,
} from '@/lib/openapi/generated'
import { mswWithSpy, resetMSW, startMSW, stopMSW } from '@/lib/serviceworker/NodeServiceWorker'
import { renderWithUserEvents } from '@/lib/support/test/utils/RenderWithUserEvents'
import { useElementSizeMock } from '@/lib/ui/hooks/useElementSize.mock'
import { NotificationProvider } from '@/lib/ui/notification'
import { normaliseScreenRender } from '@/lib/utils'
import { act, waitFor } from '@testing-library/react'
import { useState } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { ScreenTable } from './ScreenTable'

const TestComponent = ({
  screens,
  isScreenListLoading = false,
  editHandler = () => {},
}: {
  screens?: Array<ScreenItemRender>
  isScreenListLoading?: boolean
  editHandler?: (id: string) => void
}) => {
  const [highlighted, setHighlighted] = useState<ScreenItemRender | undefined>()

  return (
    <QueryProvider>
      <NotificationProvider>
        <ScreenTable
          highlighted={highlighted}
          setHighLighted={setHighlighted}
          screens={screens ?? normaliseScreenRender(getGetScreenListResponseMock().list)}
          isScreenListLoading={isScreenListLoading}
          editAction={{ handler: editHandler }}
          deleteAction={{ handler: () => {}, isPending: false }}
          showActon={{ handler: () => {}, isPending: false }}
        />
      </NotificationProvider>
    </QueryProvider>
  )
}

const TestParentComponent = ({ initialise }: { initialise?: Array<ScreenItemRender> }) => {
  return (
    <HelmetProvider>
      <QueryProvider>
        <NotificationProvider>
          <ScreenProvider initialise={{ screens: initialise ?? [], query: '' }}>
            <Screens />
          </ScreenProvider>
        </NotificationProvider>
      </QueryProvider>
    </HelmetProvider>
  )
}

describe('#ScreenTable', () => {
  const mswRequestEventSpy = mswWithSpy([
    ...getSearchServiceMock(),
    ...getScreenListServiceMock(),
    ...getScreenServiceMock(),
  ])

  beforeAll(() => {
    startMSW()
  })

  afterAll(() => {
    stopMSW()
  })

  beforeEach(() => {
    useElementSizeMock()
    resetMSW()
  })

  test('renders screen table component with a table and rows', async () => {
    const test = await renderWithUserEvents(<TestParentComponent />)

    const tableElement = await test.findByRole('table')
    expect(tableElement).toBeDefined()

    const rowElements = await test.findAllByRole('row')
    expect(rowElements.length).toBe(7)

    const colElements = await test.findAllByRole('columnheader')
    expect(colElements.length).toBe(7)
  })

  test('remove a screen row when delete button is clicked', async () => {
    const test = await renderWithUserEvents(<TestParentComponent />)

    const deleteElements = await test.findAllByTitle('Delete')
    const deleteElement = deleteElements[0]

    await act(async () => {
      await test.user.click(deleteElement)
    })

    expect(mswRequestEventSpy[mswRequestEventSpy.length - 1]).toEqual(
      expect.stringContaining('method:DELETE|url:http://dev.api.screengeometry.com/v1/screen/'),
    )

    waitFor(() => expect(test.queryAllByRole('row').length).toBe(4))
  })

  test('hide a screen row when show button is clicked', async () => {
    const test = await renderWithUserEvents(<TestParentComponent />)

    const showElements = await test.findAllByRole('checkbox')
    expect(showElements.length).toBe(4)
    const showElement = showElements[0]

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
    expect(rowElements.length).toBe(6)

    const colElements = await test.findAllByRole('columnheader')
    expect(colElements.length).toBe(7)
  })
})
