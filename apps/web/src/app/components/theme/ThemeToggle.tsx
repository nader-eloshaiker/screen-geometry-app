import { DarkMode, LightMode } from '@/app/stores/theme/Theme.types'
import { useTheme } from '@/app/stores/theme/useTheme'
import { useTranslation } from '@/app/stores/translation'
import { Button } from '@screengeometry/lib-ui/button'
import { cn } from '@screengeometry/lib-ui/utils'
import { MoonStar, Sun } from 'lucide-react'

type TProps = TRestProps & { className?: string; id: string }

export default function ThemeToggle({ className, id, ...rest }: TProps) {
  const [themeState, setThemeState] = useTheme()
  const isDarkMode = themeState === DarkMode

  const handleChange = () => {
    setThemeState(isDarkMode ? LightMode : DarkMode)
  }

  const { formatMessage } = useTranslation()

  return (
    <Button
      id={id}
      aria-label={`switch theme to ${
        isDarkMode ? formatMessage('screens.theme.lightLabel') : formatMessage('screens.theme.darkLabel')
      }`}
      onClick={handleChange}
      mode='ghost'
      dimension='none'
      className={cn('size-6 transition-none', className)}
      {...rest}
    >
      <MoonStar
        className={cn('absolute size-6', {
          'animate-out fade-in spin-0 rotate-90 opacity-0 duration-500': !isDarkMode,
          'rotate-0opacity-100 animate-out fade-out spin-90 duration-500': isDarkMode,
        })}
      />
      <Sun
        className={cn('absolute size-6', {
          'animate-out fade-in spin-90 rotate-0 opacity-0 duration-500': isDarkMode,
          'animate-out fade-out spin-0 rotate-90 opacity-100 duration-500': !isDarkMode,
        })}
      />
    </Button>
  )
}
