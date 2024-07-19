import MoonIcon from '@app/assets/icons/Moon'
import SunIcon from '@app/assets/icons/Sun'
import { useThemeModeContext } from '@app/contexts/theme/useThemeModeContext'
import { twMerge } from 'tailwind-merge'
import { DarkMode, LightMode } from './ThemeManager'

type TProps = TRestProps & { className?: string; id: string }

export default function ThemeModeToggle({ className, id, ...rest }: TProps) {
  const [themeState, setThemeState] = useThemeModeContext()
  const isDarkMode = themeState === DarkMode

  const handleChange = () => {
    setThemeState(isDarkMode ? LightMode : DarkMode)
  }

  return (
    <label htmlFor={id} className={twMerge('swap cursor-pointer swap-rotate', className)} {...rest}>
      <input type='checkbox' id={id} checked={!isDarkMode} className='theme-controller' onChange={handleChange} />
      <MoonIcon className='swap-off size-6 fill-current' />
      <SunIcon className='swap-on size-6 fill-current' />
    </label>
  )
}
