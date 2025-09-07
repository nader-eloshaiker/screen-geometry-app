import { DarkMode, LightMode } from '@/app/stores/theme/Theme.types'
import { vi } from 'vitest'
import ThemeToggle from './ThemeToggle'

// Mock the theme context hook
vi.mock('@/app/stores/theme/useTheme', () => ({
  useTheme: vi.fn(),
}))

// Import the mocked hook
import { useTheme } from '@/app/stores/theme/useTheme'
import { renderWithUserEvents } from '@/test/utils/RenderWithUserEvents'
import { TestTranslationsEnvironment } from '@/test/utils/TestTranslationsEnvironment'

describe('ThemeToggle', () => {
  const mockSetTheme = vi.fn()

  it('renders correctly in light mode', async () => {
    vi.mocked(useTheme).mockReturnValue([LightMode, mockSetTheme])

    const test = await renderWithUserEvents(<ThemeToggle id='test-toggle' />, { wrapper: TestTranslationsEnvironment })

    const button = test.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-label', 'switch theme to Dark Mode')

    const sunIcon = document.querySelector('.size-6.absolute')
    const moonIcon = document.querySelectorAll('.size-6.absolute')[1]
    expect(sunIcon).toBeInTheDocument()
    expect(moonIcon).toBeInTheDocument()
  })

  it('renders correctly in dark mode', async () => {
    vi.mocked(useTheme).mockReturnValue([DarkMode, mockSetTheme])

    const test = await renderWithUserEvents(<ThemeToggle id='test-toggle' />, { wrapper: TestTranslationsEnvironment })

    const button = test.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-label', 'switch theme to Light Mode')
  })

  it('toggles from light mode to dark mode when clicked', async () => {
    vi.mocked(useTheme).mockReturnValue([LightMode, mockSetTheme])

    const test = await renderWithUserEvents(<ThemeToggle id='test-toggle' />, { wrapper: TestTranslationsEnvironment })

    await test.user.click(test.getByRole('button'))

    expect(mockSetTheme).toHaveBeenCalledWith(DarkMode)
  })

  it('toggles from dark mode to light mode when clicked', async () => {
    vi.mocked(useTheme).mockReturnValue([DarkMode, mockSetTheme])

    const test = await renderWithUserEvents(<ThemeToggle id='test-toggle' />, { wrapper: TestTranslationsEnvironment })

    await test.user.click(test.getByRole('button'))

    expect(mockSetTheme).toHaveBeenCalledWith(LightMode)
  })

  it('applies additional className when provided', async () => {
    vi.mocked(useTheme).mockReturnValue([LightMode, mockSetTheme])

    const test = await renderWithUserEvents(<ThemeToggle id='test-toggle' className='p-1' />, {
      wrapper: TestTranslationsEnvironment,
    })

    const button = test.getByRole('button')
    expect(button).toHaveClass('p-1')
  })

  it('passes additional props to the button', async () => {
    vi.mocked(useTheme).mockReturnValue([LightMode, mockSetTheme])

    const test = await renderWithUserEvents(<ThemeToggle id='test-toggle' data-testid='theme-toggle-test' />, {
      wrapper: TestTranslationsEnvironment,
    })

    expect(test.getByTestId('theme-toggle-test')).toBeInTheDocument()
  })
})
