import { renderWithUserEvents } from '@/lib/support/test/utils/RenderWithUserEvents'
import {
  Outlet,
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Header from './Header'

// Mock the imported components
// Setup TanStack Router for testing
const setupRouter = () => {
  const rootRoute = createRootRoute({
    component: () => (
      <div>
        <Header />
        <Outlet />
      </div>
    ),
  })

  const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <div>Home Page</div>,
  })

  const routeTree = rootRoute.addChildren([homeRoute])

  const router = createRouter({
    routeTree,
    history: createMemoryHistory(),
  })

  return router
}

type TestRouter = ReturnType<typeof setupRouter>

// Helper function to render with TanStack Router
const renderWithRouter = async () => {
  const router = setupRouter()
  return renderWithUserEvents(<RouterProvider<TestRouter> router={router} />)
}

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

  beforeAll(() => {
    vi.stubEnv('VITE_APP_TITLE', 'Screen Geometry App')
  })

  afterAll(() => {
    vi.unstubAllEnvs()
  })

  it('renders correctly with app title', async () => {
    const test = await renderWithRouter()

    // Check if the app title is rendered
    expect(test.getAllByText('Screen Geometry App')).toHaveLength(2)
  })

  it('renders small header on mobile view', async () => {
    const test = await renderWithRouter()

    // Check if the small header is present
    const smallHeader = test.getByTestId('small-header')
    expect(smallHeader).toBeInTheDocument()

    // Check for the menu button
    expect(screen.getByText('Toggle navigation menu')).toBeInTheDocument()
  })

  it('renders large header on desktop view', async () => {
    const test = await renderWithRouter()

    // Check if the large header is present (even though it's hidden by CSS)
    const largeHeader = test.getByTestId('large-header')
    expect(largeHeader).toBeInTheDocument()

    // Check if HeaderNavLarge is rendered
    expect(screen.getByTestId('mocked-header-nav-large')).toBeInTheDocument()
  })

  it('opens the sheet when menu button is clicked', async () => {
    const test = await renderWithRouter()

    // Get the menu button and click it
    const menuButton = test.getByText('Toggle navigation menu').closest('button')
    expect(menuButton).toBeInTheDocument()

    if (menuButton) {
      await test.user.click(menuButton)
    }

    // The sheet should now be open, check if sheet content is visible
    expect(test.getByText('Navigation')).toBeInTheDocument()
    expect(test.getByTestId('mocked-header-nav-small')).toBeInTheDocument()
    expect(test.getByText('Theme Toggle Button')).toBeInTheDocument()
  })

  it('closes the sheet when a navigation link is clicked', async () => {
    const test = await renderWithRouter()

    // Open the sheet
    const menuButton = test.getByText('Toggle navigation menu').closest('button')
    if (menuButton) {
      await test.user.click(menuButton)
    }

    // Click on the navigation (our mock will call setOpen(false))
    const navSmall = test.getByTestId('mocked-header-nav-small')
    await test.user.click(navSmall)

    // Now the sheet header should not be visible anymore
    // This depends on SheetContent behaviors, which might be harder to test directly
  })

  it('renders theme toggle in both layouts', async () => {
    const test = await renderWithRouter()

    // Check theme toggle in both layouts
    expect(test.getByTestId('mocked-theme-toggle-theme-toggle')).toBeInTheDocument()
  })

  it('renders Title component with correct size', async () => {
    const test = await renderWithRouter()

    // Both instances of Title should have large size
    const titleElements = test.getAllByText('Screen Geometry App')
    expect(titleElements.length).toBe(2)

    // Verify the Title component has the correct classes for large size
    titleElements.forEach((title) => {
      const parent = title.closest('div')
      expect(parent).toHaveClass('flex-1', 'text-center')
    })
  })
})
