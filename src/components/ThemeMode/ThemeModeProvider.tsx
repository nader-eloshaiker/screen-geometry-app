import { useState } from 'react'
import { Context, LightMode, TThemeMode, ThemeKey, attachThemeClass } from './ThemeConstants'
import useLocalStorage from '../../hooks/useLocalStorage'

export default function ThemeModeProvider({ children }: TReactChildren) {
  const [localStorage] = useLocalStorage<TThemeMode>(ThemeKey, LightMode)
  const [theme, setTheme] = useState<TThemeMode>(localStorage)

  attachThemeClass(theme)

  return theme ? <Context.Provider value={[theme, setTheme]}>{children}</Context.Provider> : null
}
