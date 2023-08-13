import { useState } from 'react'
import useLocalStorage from '../../../hooks/useLocalStorage'
import { attachThemeClass, LightMode, ThemeKey, TThemeMode } from '../ThemeConstants'
import { ThemeModeContext } from './ThemeModeContext'

export const ThemeModeProvider = ({ children }: TReactChildren) => {
  const [localStorage] = useLocalStorage<TThemeMode>(ThemeKey, LightMode)
  const [theme, setTheme] = useState<TThemeMode>(localStorage)

  attachThemeClass(theme)

  return theme ? <ThemeModeContext.Provider value={[theme, setTheme]}>{children}</ThemeModeContext.Provider> : null
}
