import { DarkMode, LightMode } from '@/app/hooks/theme/Theme.types'
import { useTheme } from '@/app/hooks/theme/useTheme'
import { cn } from '@/lib/utils'
import { Button } from '@screengeometry/lib-ui/button'
import { MoonStar, Sun } from 'lucide-react'
import { useIntl } from 'react-intl'

type TProps = TRestProps & { className?: string; id: string }

export default function ThemeToggle({ className, id, ...rest }: TProps) {
  const [themeState, setThemeState] = useTheme()
  const isDarkMode = themeState === DarkMode

  const handleChange = () => {
    setThemeState(isDarkMode ? LightMode : DarkMode)
  }

  const { formatMessage } = useIntl()

  return (
    <Button
      id={id}
      aria-label={`switch theme to ${
        isDarkMode
          ? formatMessage({
              id: 'screens.theme.lightLabel',
              defaultMessage: 'Light Mode',
            })
          : formatMessage({
              id: 'screens.theme.darkLabel',
              defaultMessage: 'Dark Mode',
            })
      }`}
      onClick={handleChange}
      mode='ghost'
      dimension='none'
      className={cn('size-6 transition-none', className)}
      {...rest}
    >
      <MoonStar
        className={cn('size-6 absolute', {
          'rotate-90 opacity-0 animate-out fade-in spin-0 duration-500': !isDarkMode,
          'rotate-0opacity-100 animate-out fade-out spin-90 duration-500': isDarkMode,
        })}
      />
      <Sun
        className={cn('size-6 absolute', {
          'rotate-0 opacity-0 animate-out fade-in spin-90 duration-500': isDarkMode,
          'rotate-90 opacity-100 animate-out fade-out spin-0 duration-500': !isDarkMode,
        })}
      />
    </Button>
  )
}
