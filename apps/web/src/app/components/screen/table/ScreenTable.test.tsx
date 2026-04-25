import type { ScreenItemRender } from '@/app/models/screenItemRender'
import { MyScreensPage } from '@/app/pages/MyScreens/MyScreensPage'
import { QueryProvider } from '@/app/stores/query/QueryProvider'
import { normaliseScreenRender } from '@/app/stores/screen/ScreenManager'
import { ScreenProvider } from '@/app/stores/screen/ScreenProvider'
import { EnvironmentSessionLoaderKey, EnvSessionProvider } from '@/app/stores/session/EnvSessionProvider'
import { initMSW } from '@/serviceworker/NodeServiceWorker'
import { renderWithUserEvents } from '@/test/utils/RenderWithUserEvents'
import { TestEnvironment } from '@/test/utils/TestEnvironment'
import {
  getConfigurationMock,
  getGetScreenListResponseMock,
  getScreenListServiceMock,
  getScreenServiceMock,
  getSearchServiceMock,
} from '@screengeometry/lib-api/spec'
import { PageLoaderProvider } from '@screengeometry/lib-ui/pageloader'
import { Toaster } from '@screengeometry/lib-ui/toaster'
import { createMemoryHistory, createRootRoute, createRoute, createRouter, RouterProvider } from '@tanstack/react-router'
import { waitFor } from '@testing-library/react'
import { useMemo, useState } from 'react'
import { ScreenTable } from './ScreenTable'

vi.mock('@/app/hooks/useElementSize', () => ({
  __esModule: true,
  useElementSize: () => [() => {}, { width: 1024, height: 1024 }],
}))

const createMockMutation = () => ({
  isPending: false as const,
  status: 'idle' as const,
  isSuccess: false as const,
  isError: false as const,
  isIdle: true as const,
  data: undefined,
  error: null,
  failureCount: 0,
  failureReason: null,
  errorUpdateCount: 0,
  isPaused: false as const,
  variables: undefined,
  context: undefined,
  submittedAt: 0,
  id: undefined as string | undefined,
  mutate: vi.fn(),
  mutateAsync: vi.fn(),
  reset: vi.fn(),
})

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
          formOpenHandler={{ onAction: editHandler }}
          deleteHandler={createMockMutation()}
          showHandler={createMockMutation()}
        />
        <Toaster />
      </TestEnvironment>
    </QueryProvider>
  )
}

const TestRouter = ({ children }: React.PropsWithChildren) => {
  const memoryHistory = useMemo(
    () =>
      createMemoryHistory({
        initialEntries: ['/myscreens'],
        initialIndex: 0,
      }),
    []
  )
  const rootRoute = useMemo(
    () =>
      createRootRoute({
        component: () => children,
      }),
    [children]
  )
  const router = useMemo(
    () =>
      createRouter({
        history: memoryHistory,
        defaultPendingMinMs: 0,
        routeTree: rootRoute.addChildren([
          createRoute({
            path: '*',
            component: () => children,
            getParentRoute: () => rootRoute,
          }),
        ]),
      }),
    [memoryHistory, children, rootRoute]
  )

  return <RouterProvider<typeof router> router={router} />
}

const TestParentComponent = ({ initialise }: { initialise?: Array<ScreenItemRender> }) => {
  return (
    <QueryProvider>
      <TestEnvironment>
        <TestRouter>
          <PageLoaderProvider initialLoadingKeys={[EnvironmentSessionLoaderKey]}>
            <EnvSessionProvider>
              <ScreenProvider initialise={{ screens: initialise ?? [], query: '' }}>
                <MyScreensPage />
              </ScreenProvider>
            </EnvSessionProvider>
          </PageLoaderProvider>
          <Toaster />
        </TestRouter>
      </TestEnvironment>
    </QueryProvider>
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

    expect(mswObj.apiEventStack).toEqual(
      expect.arrayContaining([
        expect.stringContaining('method:DELETE|url:https://dev.api.screengeometry.com/v1/screen/'),
      ])
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

    const patchEvent = mswObj.apiEventStack.find(
      (event) => event.includes('method:PATCH') && event.includes('/v1/screen/')
    )
    expect(patchEvent).toBeDefined()
    expect(patchEvent).toEqual(expect.stringContaining('/show'))
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
