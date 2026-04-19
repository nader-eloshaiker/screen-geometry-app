import { TestTranslationsEnvironment } from '@/test/utils/TestTranslationsEnvironment'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { HeaderNavSmall } from './HeaderNavSmall'

// Mock the NavigationLink component
vi.mock('@screengeometry/lib-ui/navigationlink', () => ({
  NavigationLink: ({
    children,
    to,
    mode,
    className,
    onClick,
  }: React.PropsWithChildren & { to: string; mode: string; className: string; onClick: () => void }) => (
    <a
      href={to}
      data-testid={`nav-link-${to.replace('/', '')}`}
      data-mode={mode}
      className={className}
      onClick={(e) => {
        e.preventDefault()
        onClick()
      }}
    >
      {children}
    </a>
  ),
}))

// Mock TanStack Router hooks and components
vi.mock('@tanstack/react-router', () => ({
  useMatchRoute: () => () => false,
  useRouterState: () => ({
    isServer: false,
    location: {
      pathname: '/',
      search: '',
      hash: '',
      state: null,
      key: 'test',
    },
    status: 'idle',
    matches: [],
    pendingMatches: [],
  }),
  Link: ({ children, to, onClick, ...props }: React.PropsWithChildren & { to: string; onClick?: () => void }) => (
    <a href={to} onClick={onClick} {...props}>
      {children}
    </a>
  ),
}))

describe('HeaderNavSmall', () => {
  it('renders navigation with correct aria-label and classes', () => {
    const mockSetOpen = vi.fn()
    render(<HeaderNavSmall setOpen={mockSetOpen} />, { wrapper: TestTranslationsEnvironment })

    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveAttribute('aria-label', 'Main')
    expect(nav).toHaveClass('flex', 'flex-col', 'space-y-1', 'px-4')
  })

  it('renders all navigation links with correct text', () => {
    const mockSetOpen = vi.fn()
    render(<HeaderNavSmall setOpen={mockSetOpen} />, { wrapper: TestTranslationsEnvironment })

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('My Screens')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
    expect(screen.getByText('Help')).toBeInTheDocument()
  })

  it('has links pointing to the correct routes', () => {
    const mockSetOpen = vi.fn()
    render(<HeaderNavSmall setOpen={mockSetOpen} />, { wrapper: TestTranslationsEnvironment })

    // Home link
    const homeLink = screen.getByText('Home').closest('a')
    expect(homeLink).toHaveAttribute('href', '/')

    // Screens link
    const screensLink = screen.getByText('My Screens').closest('a')
    expect(screensLink).toHaveAttribute('href', '/myscreens')

    // Contact link
    const contactLink = screen.getByText('Contact').closest('a')
    expect(contactLink).toHaveAttribute('href', '/contact')

    // Help link
    const helpLink = screen.getByText('Help').closest('a')
    expect(helpLink).toHaveAttribute('href', '/help')
  })

  it('passes correct props to each NavigationLink', () => {
    const mockSetOpen = vi.fn()
    render(<HeaderNavSmall setOpen={mockSetOpen} />, { wrapper: TestTranslationsEnvironment })

    const links = [
      screen.getByText('Home').closest('a'),
      screen.getByText('My Screens').closest('a'),
      screen.getByText('Contact').closest('a'),
      screen.getByText('Help').closest('a'),
    ]

    links.forEach((link) => {
      expect(link).toHaveClass('justify-between', 'w-full')
    })
  })

  it('calls setOpen(false) when any link is clicked', async () => {
    const mockSetOpen = vi.fn()
    const user = userEvent.setup()
    render(<HeaderNavSmall setOpen={mockSetOpen} />, { wrapper: TestTranslationsEnvironment })

    // Click each link and verify setOpen was called with false
    const links = [
      screen.getByText('Home').closest('a'),
      screen.getByText('My Screens').closest('a'),
      screen.getByText('Contact').closest('a'),
      screen.getByText('Help').closest('a'),
    ]

    for (const link of links) {
      mockSetOpen.mockClear()

      await user.click(link!)

      expect(mockSetOpen).toHaveBeenCalledTimes(1)
      expect(mockSetOpen).toHaveBeenCalledWith(false)
    }
  })

  it('requires setOpen prop to be provided', async () => {
    // TypeScript would catch this at compile time, but testing for prop requirements is still good
    const mockSetOpen = vi.fn()
    const user = userEvent.setup()
    render(<HeaderNavSmall setOpen={mockSetOpen} />, { wrapper: TestTranslationsEnvironment })

    // Check that it renders with the prop
    expect(screen.getByRole('navigation')).toBeInTheDocument()

    // Test that the component uses the provided prop
    const homeLink = screen.getByText('Home').closest('a')
    await user.click(homeLink!)
    expect(mockSetOpen).toHaveBeenCalledWith(false)
  })
})
