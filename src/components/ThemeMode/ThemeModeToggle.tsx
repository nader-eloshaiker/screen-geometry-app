import MoonIcon from '../svg/Moon'
import SunIcon from '../svg/Sun'
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
      <button id='theme-toggle' onClick={handleChange} type='button' className='btn-link btn'>
        <SunIcon
          id='theme-dark-icon'
          className={`${isDarkMode ? 'hidden' : ''} h-8 w-8 text-indigo-200`}
          fill='currentColor'
        />
        <MoonIcon
          id='theme-light-icon'
          className={`${isDarkMode ? '' : 'hidden'} h-8 w-8 text-indigo-900`}
          fill='currentColor'
        />
      </button>
    </div>
  )
}
