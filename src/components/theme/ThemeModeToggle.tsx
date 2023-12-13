import MoonIcon from '@assets/icons/Moon'
import SunIcon from '@assets/icons/Sun'
import { useThemeMode } from '@hooks/useThemeMode'
import { twMerge } from 'tailwind-merge'
import { DarkMode, LightMode } from './ThemeConstants'

type TProps = TRestProps & { className?: string }

export default function ThemeModeToggle({ className, ...rest }: TProps) {
  const [themeState, setThemeState] = useThemeMode()
  const isDarkMode = themeState === DarkMode

  const handleChange = () => {
    setThemeState(isDarkMode ? LightMode : DarkMode)
  }

  return (
    <label className={twMerge('swap cursor-pointer grid place-items-center', className)} {...rest}>
      {/* this hidden checkbox controls the state */}
      <input
        type='checkbox'
        checked={!isDarkMode}
        className='theme-controller toggle toggle-primary toggle-md col-span-2 col-start-1'
        onChange={handleChange}
      />
      <MoonIcon className='swap-off col-start-1 row-start-1 h-4 w-4 p-0' fill='currentColor' />
      <SunIcon className='swap-on col-start-2 row-start-1 h-4 w-4 p-0' fill='currentColor' />
    </label>
  )
}
