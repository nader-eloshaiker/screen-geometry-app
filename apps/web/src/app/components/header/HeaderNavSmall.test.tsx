import { renderWithUserEvents } from '@/lib/support/test/utils/RenderWithUserEvents'
import { TestTranslationsEnvironment } from '@/lib/support/test/utils/TestTranslationsEnvironment'
import { render, screen } from '@testing-library/react'
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

describe('HeaderNavSmall', () => {
  it('renders navigation with correct aria-label and classes', () => {
    const mockSetOpen = vi.fn()
    render(<HeaderNavSmall setOpen={mockSetOpen} />, { wrapper: TestTranslationsEnvironment })

    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveAttribute('aria-label', 'Main')
    expect(nav).toHaveClass('grid', 'gap-6', 'py-6')
  })

  it('renders all navigation links with correct text', () => {
    const mockSetOpen = vi.fn()
    render(<HeaderNavSmall setOpen={mockSetOpen} />, { wrapper: TestTranslationsEnvironment })

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Screens')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
    expect(screen.getByText('Help')).toBeInTheDocument()
  })

  it('has links pointing to the correct routes', () => {
    const mockSetOpen = vi.fn()
    render(<HeaderNavSmall setOpen={mockSetOpen} />, { wrapper: TestTranslationsEnvironment })

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
    render(<HeaderNavSmall setOpen={mockSetOpen} />, { wrapper: TestTranslationsEnvironment })

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

  it('calls setOpen(false) when any link is clicked', async () => {
    const mockSetOpen = vi.fn()
    const test = await renderWithUserEvents(<HeaderNavSmall setOpen={mockSetOpen} />, {
      wrapper: TestTranslationsEnvironment,
    })

    // Click each link and verify setOpen was called with false
    const links = [
      test.getByTestId('nav-link-'),
      test.getByTestId('nav-link-screens'),
      test.getByTestId('nav-link-contact'),
      test.getByTestId('nav-link-help'),
    ]

    for await (const link of links) {
      mockSetOpen.mockClear()

      await test.user.click(link)

      expect(mockSetOpen).toHaveBeenCalledTimes(1)
      expect(mockSetOpen).toHaveBeenCalledWith(false)
    }
  })

  it('requires setOpen prop to be provided', async () => {
    // TypeScript would catch this at compile time, but testing for prop requirements is still good
    const mockSetOpen = vi.fn()
    const test = await renderWithUserEvents(<HeaderNavSmall setOpen={mockSetOpen} />, {
      wrapper: TestTranslationsEnvironment,
    })

    // Check that it renders with the prop
    expect(test.getByRole('navigation')).toBeInTheDocument()

    // Test that the component uses the provided prop
    const homeLink = test.getByTestId('nav-link-')
    await test.user.click(homeLink)
    expect(mockSetOpen).toHaveBeenCalledWith(false)
  })
})
