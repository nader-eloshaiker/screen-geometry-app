import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { HeaderNavSmall } from './HeaderNavSmall'

// Mock the NavigationLink component
vi.mock('@/lib/ui/components/navigationlink/NavigationLink', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  NavigationLink: ({ children, to, mode, className, onClick }: any) => (
    <a
      href={to}
      data-testid={`nav-link-${to.replace('/', '')}`}
      data-mode={mode}
      className={className}
      onClick={onClick}
    >
      {children}
    </a>
  ),
}))

describe('HeaderNavSmall', () => {
  it('renders navigation with correct aria-label and classes', () => {
    const mockSetOpen = vi.fn()
    render(<HeaderNavSmall setOpen={mockSetOpen} />)

    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveAttribute('aria-label', 'Main')
    expect(nav).toHaveClass('grid', 'gap-6', 'py-6')
  })

  it('renders all navigation links with correct text', () => {
    const mockSetOpen = vi.fn()
    render(<HeaderNavSmall setOpen={mockSetOpen} />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Screens')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
    expect(screen.getByText('Help')).toBeInTheDocument()
  })

  it('has links pointing to the correct routes', () => {
    const mockSetOpen = vi.fn()
    render(<HeaderNavSmall setOpen={mockSetOpen} />)

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
    const mockSetOpen = vi.fn()
    render(<HeaderNavSmall setOpen={mockSetOpen} />)

    const links = [
      screen.getByTestId('nav-link-'),
      screen.getByTestId('nav-link-screens'),
      screen.getByTestId('nav-link-contact'),
      screen.getByTestId('nav-link-help'),
    ]

    links.forEach((link) => {
      expect(link).toHaveAttribute('data-mode', 'ghost')
      expect(link).toHaveClass('justify-start', 'text-lg', 'font-semibold')
    })
  })

  it('calls setOpen(false) when any link is clicked', () => {
    const mockSetOpen = vi.fn()
    render(<HeaderNavSmall setOpen={mockSetOpen} />)

    // Click each link and verify setOpen was called with false
    const links = [
      screen.getByTestId('nav-link-'),
      screen.getByTestId('nav-link-screens'),
      screen.getByTestId('nav-link-contact'),
      screen.getByTestId('nav-link-help'),
    ]

    links.forEach((link) => {
      mockSetOpen.mockClear()
      fireEvent.click(link)
      expect(mockSetOpen).toHaveBeenCalledTimes(1)
      expect(mockSetOpen).toHaveBeenCalledWith(false)
    })
  })

  it('requires setOpen prop to be provided', () => {
    // TypeScript would catch this at compile time, but testing for prop requirements is still good
    const mockSetOpen = vi.fn()
    render(<HeaderNavSmall setOpen={mockSetOpen} />)

    // Check that it renders with the prop
    expect(screen.getByRole('navigation')).toBeInTheDocument()

    // Test that the component uses the provided prop
    const homeLink = screen.getByTestId('nav-link-')
    fireEvent.click(homeLink)
    expect(mockSetOpen).toHaveBeenCalledWith(false)
  })
})
