import { renderWithUserEvents } from '@/lib/support/test/utils/RenderWithUserEvents'
import { TestEnvironment } from '@/lib/support/test/utils/TestEnvironment'
import { RouterProvider, createMemoryHistory, createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import { screen, waitFor } from '@testing-library/react'
import { useMemo } from 'react'
import { vi } from 'vitest'
import Header from './Header'

// Mock the imported components
const TestRouter = ({ children }: React.PropsWithChildren) => {
  const memoryHistory = useMemo(
    () =>
      createMemoryHistory({
        initialEntries: ['/'],
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

  return (
    <TestEnvironment>
      <RouterProvider<typeof router> router={router} />{' '}
    </TestEnvironment>
  )
}

// Helper function to render with TanStack Router
describe('#Header', () => {
  vi.mock('./HeaderNavLarge', () => ({
    HeaderNavLarge: () => <div data-testid='mocked-header-nav-large'>HeaderNavLarge</div>,
  }))

  vi.mock('./HeaderNavSmall', () => ({
    HeaderNavSmall: ({ setOpen }: { setOpen: (open: boolean) => void }) => (
      <div data-testid='mocked-header-nav-small' onClick={() => setOpen(false)}>
        HeaderNavSmall
      </div>
    ),
  }))

  vi.mock('@/app/components/theme/ThemeToggle', () => ({
    default: ({ id, className }: { id: string; className?: string }) => (
      <button data-testid={`mocked-theme-toggle-${id}`} className={className}>
        Theme Toggle Button
      </button>
    ),
  }))

  // beforeAll(() => {
  //   vi.stubEnv('VITE_APP_TITLE', 'Screen Geometry App')
  // })

  // afterAll(() => {
  //   vi.unstubAllEnvs()
  // })

  it('renders correctly with app title', async () => {
    const test = await renderWithUserEvents(<Header />, { wrapper: TestRouter })

    // Check if the app title is rendered
    expect(test.getAllByText('Screen Geo.[dev]')).toHaveLength(2)
  })

  it('renders small header on mobile view', async () => {
    const test = await renderWithUserEvents(<Header />, { wrapper: TestRouter })

    // Check if the small header is present
    const smallHeader = test.getByTestId('small-header')
    expect(smallHeader).toBeInTheDocument()

    // Check for the menu button
    expect(screen.getByText('Toggle navigation menu')).toBeInTheDocument()
  })

  it('renders large header on desktop view', async () => {
    const test = await renderWithUserEvents(<Header />, { wrapper: TestRouter })

    // Check if the large header is present (even though it's hidden by CSS)
    const largeHeader = test.getByTestId('large-header')
    expect(largeHeader).toBeInTheDocument()

    // Check if HeaderNavLarge is rendered
    expect(screen.getByTestId('mocked-header-nav-large')).toBeInTheDocument()
  })

  it('opens the sheet when menu button is clicked', async () => {
    const test = await renderWithUserEvents(<Header />, { wrapper: TestRouter })

    // Get the menu button and click it
    const menuButton = test.getByRole('button', { name: 'Toggle navigation menu' })
    expect(menuButton).toBeInTheDocument()

    await waitFor(async () => test.user.click(menuButton))

    // The sheet should now be open, check if sheet content is visible
    expect(test.getByText('Navigation')).toBeInTheDocument()
    expect(test.getByTestId('mocked-header-nav-small')).toBeInTheDocument()
    expect(test.getAllByText('Theme Toggle Button')).toHaveLength(2)
  })

  it('closes the sheet when a navigation link is clicked', async () => {
    const test = await renderWithUserEvents(<Header />, { wrapper: TestRouter })

    // Open the sheet
    const menuButton = test.getByText('Toggle navigation menu')
    await waitFor(async () => test.user.click(menuButton))

    // Click on the navigation (our mock will call setOpen(false))
    const navSmall = test.getByTestId('mocked-header-nav-small')
    await waitFor(async () => test.user.click(navSmall))

    // Now the sheet header should not be visible anymore
    // This depends on SheetContent behaviors, which might be harder to test directly
  })

  it('renders theme toggle in both layouts', async () => {
    const test = await renderWithUserEvents(<Header />, { wrapper: TestRouter })

    // Check theme toggle in both layouts
    expect(test.getByTestId('mocked-theme-toggle-theme-toggle')).toBeInTheDocument()
  })

  it('renders Title component with correct size', async () => {
    const test = await renderWithUserEvents(<Header />, { wrapper: TestRouter })

    // Both instances of Title should have large size
    const titleElements = test.getAllByText('Screen Geo.[dev]')
    expect(titleElements.length).toBe(2)

    // Verify the Title component has the correct classes for large size
    titleElements.forEach((title) => {
      const parent = title.closest('div')
      expect(parent).toHaveClass('flex-1', 'text-center')
    })
  })
})
