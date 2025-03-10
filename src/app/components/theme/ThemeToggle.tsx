import { DarkMode, LightMode } from '@/app/contexts/theme/Theme.types'
import { useTheme } from '@/app/contexts/theme/useTheme'
import { Button } from '@/lib/ui/components/button/Button'
import { cn } from '@/lib/utils'
import { MoonStar, Sun } from 'lucide-react'

type TProps = TRestProps & { className?: string; id: string }

export default function ThemeToggle({ className, id, ...rest }: TProps) {
  const [themeState, setThemeState] = useTheme()
  const isDarkMode = themeState === DarkMode

  const handleChange = () => {
    setThemeState(isDarkMode ? LightMode : DarkMode)
  }

  return (
    <Button
      id={id}
      aria-label={`switch theme to ${isDarkMode ? 'Light Mode' : 'Dark Mode'}`}
      onClick={handleChange}
      mode='ghost'
      dimension='none'
      className={cn('size-6 transition-none', className)}
      {...rest}
    >
      <MoonStar
        className={cn('size-6 absolute', {
          'rotate-90 opacity-0 animate-out fade-in spin-0 duration-500': isDarkMode,
          'rotate-0opacity-100 animate-out fade-out spin-90 duration-500': !isDarkMode,
        })}
      />
      <Sun
        className={cn('size-6 absolute', {
          'rotate-0 opacity-0 animate-out fade-in spin-90 duration-500': !isDarkMode,
          'rotate-90 opacity-100 animate-out fade-out spin-0 duration-500': isDarkMode,
        })}
      />
    </Button>
  )
}
