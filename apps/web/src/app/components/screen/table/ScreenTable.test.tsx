import { QueryProvider } from '@/app/hooks/query/QueryProvider'
import { normaliseScreenRender } from '@/app/hooks/screen/ScreenManager'
import { ScreenProvider } from '@/app/hooks/screen/ScreenProvider'
import { EnvSessionProvider } from '@/app/hooks/session/EnvSessionProvider'
import type { ScreenItemRender } from '@/app/models/screenItemRender'
import { Screens } from '@/app/pages/Screens'
import { initMSW } from '@/lib/serviceworker/NodeServiceWorker'
import { renderWithUserEvents } from '@/lib/support/test/utils/RenderWithUserEvents'
import { TestEnvironment } from '@/lib/support/test/utils/TestEnvironment'
import {
  getConfigurationMock,
  getGetScreenListResponseMock,
  getScreenListServiceMock,
  getScreenServiceMock,
  getSearchServiceMock,
} from '@screengeometry/lib-api/spec'
import { Toaster } from '@screengeometry/lib-ui/toaster'
import { waitFor } from '@testing-library/react'
import { useState } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { ScreenTable } from './ScreenTable'

vi.mock('@/lib/ui/hooks/useElementSize', () => ({
  __esModule: true,
  useElementSize: () => [() => {}, { width: 1024, height: 1024 }],
}))

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
      <TestEnvironment>
        <ScreenTable
          highlighted={highlighted}
          setHighLighted={setHighlighted}
          screens={screens ?? normaliseScreenRender(getGetScreenListResponseMock().list)}
          isScreenListLoading={isScreenListLoading}
          editAction={{ handler: editHandler }}
          deleteAction={{ handler: () => {}, isPending: false }}
          showActon={{ handler: () => {}, isPending: false }}
        />
        <Toaster />
      </TestEnvironment>
    </QueryProvider>
  )
}

const TestParentComponent = ({ initialise }: { initialise?: Array<ScreenItemRender> }) => {
  return (
    <HelmetProvider>
      <QueryProvider>
        <TestEnvironment>
          <EnvSessionProvider>
            <ScreenProvider initialise={{ screens: initialise ?? [], query: '' }}>
              <Screens />
            </ScreenProvider>
            <Toaster />
          </EnvSessionProvider>
        </TestEnvironment>
      </QueryProvider>
    </HelmetProvider>
  )
}

describe('#ScreenTable', () => {
  const mswObj = initMSW([
    ...getSearchServiceMock(),
    ...getScreenListServiceMock(),
    ...getScreenServiceMock(),
    ...getConfigurationMock(),
  ])

  beforeAll(() => {
    mswObj.start()
  })

  afterAll(() => {
    mswObj.stop()
  })

  beforeEach(() => {
    mswObj.reset()
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
    expect(deleteElements.length).toBe(4)

    await waitFor(async () => {
      await test.user.click(deleteElements[0])
    })

    expect(expect(mswObj.apiEventStack.length).toBe(2))
    expect(mswObj.apiEventStack[mswObj.apiEventStack.length - 1]).toEqual(
      expect.stringContaining('method:DELETE|url:https://dev.api.screengeometry.com/v1/screen/')
    )
  })

  test('hide a screen row when show button is clicked', async () => {
    const test = await renderWithUserEvents(<TestParentComponent />)

    const showElements = await test.findAllByRole('checkbox')
    expect(showElements.length).toBe(4)
    const showElement = showElements[0]

    await waitFor(async () => {
      await test.user.click(showElement)
    })

    const apiEventStack = mswObj.apiEventStack[mswObj.apiEventStack.length - 1]
    expect(apiEventStack).toEqual(
      expect.stringContaining('method:PATCH|url:https://dev.api.screengeometry.com/v1/screen/')
    )
    expect(apiEventStack).toEqual(expect.stringContaining('/show'))
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
