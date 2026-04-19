import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { HeaderNavLarge } from './HeaderNavLarge'

// Mock react-intl
vi.mock('react-intl', () => ({
  IntlProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  FormattedMessage: ({ id, defaultMessage }: { id: string; defaultMessage: string }) => (
    <span>{defaultMessage || id}</span>
  ),
}))

// Mock TanStack Router Link component
vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, to, ...props }: React.PropsWithChildren & { to: string }) => (
    <a href={to} data-testid={`nav-link-${to.replace('/', '')}`} {...props}>
      {children}
    </a>
  ),
  useMatchRoute: () => () => false,
}))

describe('#HeaderNavLarge', () => {
  it('renders navigation menu component', () => {
    render(<HeaderNavLarge />)

    const navMenu = screen.getByRole('navigation')
    expect(navMenu).toBeInTheDocument()
  })

  it('contains all navigation links with correct text', () => {
    render(<HeaderNavLarge />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('My Screens')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
    expect(screen.getByText('Help')).toBeInTheDocument()
  })

  it('has links pointing to the correct routes', () => {
    render(<HeaderNavLarge />)

    // Home link
    const homeLink = screen.getByTestId('nav-link-')
    expect(homeLink).toHaveAttribute('href', '/')

    // Screens link
    const screensLink = screen.getByTestId('nav-link-myscreens')
    expect(screensLink).toHaveAttribute('href', '/myscreens')

    // Contact link
    const contactLink = screen.getByTestId('nav-link-contact')
    expect(contactLink).toHaveAttribute('href', '/contact')

    // Help link
    const helpLink = screen.getByTestId('nav-link-help')
    expect(helpLink).toHaveAttribute('href', '/help')
  })

  it('renders navigation menu items', () => {
    render(<HeaderNavLarge />)

    const navMenuItems = screen.getAllByRole('listitem')
    expect(navMenuItems).toHaveLength(5) // Home, My Screens, Presets (dropdown), Contact, Help
  })

  it('renders navigation menu trigger for dropdown', () => {
    render(<HeaderNavLarge />)

    const navMenuTrigger = screen.getByRole('button', { name: 'Presets' })
    expect(navMenuTrigger).toBeInTheDocument()
  })
})
