import { twMerge } from 'tailwind-merge'
import MoonIcon from '../icons/Moon'
import SunIcon from '../icons/Sun'
import { DarkMode, LightMode } from './ThemeConstants'
import { useThemeMode } from './useThemeMode'

type TProps = TRestProps & { className?: string }

export default function ThemeModeToggle({ className, ...rest }: TProps) {
  const [themeState, setThemeState] = useThemeMode()
  const isDarkMode = themeState === DarkMode

  const handleChange = () => {
    setThemeState(isDarkMode ? LightMode : DarkMode)
  }

  return (
    <label className={twMerge(className, 'btn-ghost btn px-2 swap swap-rotate')} {...rest}>
      {/* this hidden checkbox controls the state */}
      <input type='checkbox' className='hidden' onClick={handleChange} />

      <SunIcon id='theme-dark-icon' className='w-10 h-10 px-2 py-0 swap-on' fill='currentColor' />
      <MoonIcon id='theme-light-icon' className='w-10 h-10 px-2 py-0 swap-off' fill='currentColor' />
    </label>
  )
}
