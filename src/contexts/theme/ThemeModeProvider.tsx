import { useState } from 'react'
import { attachThemeClass, LightMode, ThemeKey, TThemeMode } from '../../components/theme/ThemeConstants'
import useLocalStorage from '../../hooks/useLocalStorage'
import { ThemeModeContext } from './ThemeModeContext'

export const ThemeModeProvider = ({ children }: TReactChildren) => {
  const [localStorage] = useLocalStorage<TThemeMode>(ThemeKey, LightMode)
  const [theme, setTheme] = useState<TThemeMode>(localStorage)

  attachThemeClass(theme)

  return theme ? <ThemeModeContext.Provider value={[theme, setTheme]}>{children}</ThemeModeContext.Provider> : null
}
