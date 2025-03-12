import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { HeaderNavLarge } from './HeaderNavLarge'

// Mock the NavigationLink component
vi.mock('@/lib/ui/components/navigationlink/NavigationLink', () => ({
  NavigationLink: ({
    children,
    to,
    mode,
    palette,
    className,
  }: TReactChildren & { to: string; mode: string; className: string; palette: string; onClick: () => void }) => (
    <a
      href={to}
      data-testid={`nav-link-${to.replace('/', '')}`}
      data-mode={mode}
      data-palette={palette}
      className={className}
    >
      {children}
    </a>
  ),
}))

describe('#HeaderNavLarge', () => {
  it('renders navigation with correct aria-label', () => {
    render(<HeaderNavLarge />)

    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveAttribute('aria-label', 'Main')
  })

  it('renders with the correct CSS class', () => {
    render(<HeaderNavLarge />)

    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('flex', 'gap-6')
    expect(nav).toHaveAttribute('data-testid', 'large-header-menu')
  })

  it('contains all navigation links with correct text', () => {
    render(<HeaderNavLarge />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Screens')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
    expect(screen.getByText('Help')).toBeInTheDocument()
  })

  it('has links pointing to the correct routes', () => {
    render(<HeaderNavLarge />)

    // Home link
    const homeLink = screen.getByTestId('nav-link-')
    expect(homeLink).toHaveAttribute('href', '/')

    // Screens link
    const screensLink = screen.getByTestId('nav-link-screens')
    expect(screensLink).toHaveAttribute('href', '/screens')

    // Contact link
    const contactLink = screen.getByTestId('nav-link-contact')
    expect(contactLink).toHaveAttribute('href', '/contact')

    // Help link
    const helpLink = screen.getByTestId('nav-link-help')
    expect(helpLink).toHaveAttribute('href', '/help')
  })

  it('passes correct props to each NavigationLink', () => {
    render(<HeaderNavLarge />)

    // Check all links for common props
    const links = [
      screen.getByTestId('nav-link-'),
      screen.getByTestId('nav-link-screens'),
      screen.getByTestId('nav-link-contact'),
      screen.getByTestId('nav-link-help'),
    ]

    links.forEach((link) => {
      expect(link).toHaveAttribute('data-mode', 'ghost')
      expect(link).toHaveAttribute('data-palette', 'secondary')
      expect(link).toHaveClass('group', 'w-24', 'text-base', 'font-semibold')
    })
  })
})
