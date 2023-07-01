import MoonIcon from '../icons/Moon'
import SunIcon from '../icons/Sun'
import { DarkMode, LightMode } from './ThemeConstants'
import { useThemeMode } from './useThemeMode'

type TProps = TReactChildren & TRestProps & { title?: string }

export default function ThemeModeToggle({ children: _children, title: _title, ...rest }: TProps) {
  const [themeState, setThemeState] = useThemeMode()
  const isDarkMode = themeState === DarkMode

  const handleChange = () => {
    setThemeState(isDarkMode ? LightMode : DarkMode)
  }

  return (
    <div {...rest}>
      <button
        id='theme-toggle'
        onClick={handleChange}
        type='button'
        className='btn-ghost btn p-2 py-0 text-indigo-200 dark:text-indigo-900'
      >
        <SunIcon id='theme-dark-icon' className={`${isDarkMode ? 'hidden' : ''} h-6 w-6`} fill='currentColor' />
        <MoonIcon id='theme-light-icon' className={`${isDarkMode ? '' : 'hidden'} h-6 w-6`} fill='currentColor' />
      </button>
    </div>
  )
}
