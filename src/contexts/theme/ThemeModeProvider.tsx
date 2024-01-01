import { attachThemeClass, LightMode, ThemeKey, TThemeMode } from '@components/theme/ThemeConstants'
import useLocalStorage from '@hooks/useLocalStorage'
import { useState } from 'react'
import { ThemeModeContext } from './ThemeModeContext'

export const ThemeModeProvider = ({ children, initialise }: TReactChildren & { initialise?: TThemeMode }) => {
  const [localStorage] = useLocalStorage<TThemeMode>(ThemeKey, initialise ?? LightMode)
  const [theme, setTheme] = useState<TThemeMode>(localStorage)

  attachThemeClass(theme)

  return theme ? <ThemeModeContext.Provider value={[theme, setTheme]}>{children}</ThemeModeContext.Provider> : null
}
