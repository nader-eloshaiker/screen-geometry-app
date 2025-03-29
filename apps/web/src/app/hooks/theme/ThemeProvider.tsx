import useLocalStorage from '@/app/hooks/useLocalStorage'
import { useEffect, useMemo } from 'react'
import { DarkMode, LightMode, TThemeMode, ThemeKey } from './Theme.types'
import { ThemeContext } from './ThemeContext'

const getSystemTheme = () => (window.matchMedia('(prefers-color-scheme: dark)').matches ? DarkMode : LightMode)

export const ThemeProvider = ({
  children,
  initialise,
  ...rest
}: TReactChildren & TRestProps & { initialise?: TThemeMode }) => {
  const [theme, setTheme] = useLocalStorage<TThemeMode>(ThemeKey, initialise ?? getSystemTheme())

  useEffect(() => {
    const root = window.document.documentElement
    root.setAttribute('data-theme', theme)
    root.classList.remove(LightMode, DarkMode)
    root.classList.add(theme)
  }, [theme])

  useEffect(() => {
    const updateTheme = (evt: MediaQueryListEvent) => setTheme(evt.matches ? DarkMode : LightMode)

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme)

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', updateTheme)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const contextValue = useMemo(() => [theme, setTheme] as const, [setTheme, theme])

  return (
    <ThemeContext.Provider {...rest} value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}
