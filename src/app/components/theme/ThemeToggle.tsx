import { DarkMode, LightMode } from '@/app/contexts/theme/Theme.types'
import { useTheme } from '@/app/contexts/theme/useTheme'
import { MoonStar, Sun } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

type TProps = TRestProps & { className?: string; id: string }

export default function ThemeToggle({ className, id, ...rest }: TProps) {
  const [themeState, setThemeState] = useTheme()
  const isDarkMode = themeState === DarkMode

  const handleChange = () => {
    setThemeState(isDarkMode ? LightMode : DarkMode)
  }

  return (
    <label htmlFor={id} className={twMerge('swap cursor-pointer swap-rotate', className)} {...rest}>
      <input type='checkbox' id={id} checked={!isDarkMode} className='theme-controller' onChange={handleChange} />
      <MoonStar className='swap-off size-6' />
      <Sun className='swap-on size-6' />
    </label>
  )
}
