import { twMerge } from 'tailwind-merge'
import MoonIcon from '../../assets/icons/Moon'
import SunIcon from '../../assets/icons/Sun'
import { useThemeMode } from '../../hooks/useThemeMode'
import { DarkMode, LightMode } from './ThemeConstants'

type TProps = TRestProps & { className?: string }

export default function ThemeModeToggle({ className, ...rest }: TProps) {
  const [themeState, setThemeState] = useThemeMode()
  const isDarkMode = themeState === DarkMode

  const handleChange = () => {
    setThemeState(isDarkMode ? LightMode : DarkMode)
  }

  return (
    <label className={twMerge(className, 'swap-rotate swap')} {...rest}>
      {/* this hidden checkbox controls the state */}
      <input type='checkbox' className='hidden' onClick={handleChange} />

      <SunIcon id='theme-dark-icon' className='swap-on h-5 w-5 p-0' fill='currentColor' />
      <MoonIcon id='theme-light-icon' className='swap-off h-5 w-5 p-0' fill='currentColor' />
    </label>
  )
}
