import { attachThemeClass, DarkMode, LightMode, ThemeKey, TThemeMode } from '@app/components/theme/ThemeManager'
import useLocalStorage from '@app/hooks/useLocalStorage'
import { useEffect } from 'react'
import { ThemeModeContext } from './ThemeModeContext'

export const ThemeModeProvider = ({ children, initialise }: TReactChildren & { initialise?: TThemeMode }) => {
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? DarkMode : LightMode

  const contextValue = useLocalStorage<TThemeMode>(ThemeKey, initialise ?? systemTheme)
  const [theme, setTheme] = contextValue

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')

    // This callback will fire if the perferred color scheme changes without a reload
    mq.addEventListener('change', (evt) => setTheme(evt.matches ? DarkMode : LightMode))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    attachThemeClass(theme)
  }, [theme])

  return theme ? <ThemeModeContext.Provider value={contextValue}>{children}</ThemeModeContext.Provider> : null
}
