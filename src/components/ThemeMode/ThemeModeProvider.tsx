import { useState } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import { attachThemeClass, Context, LightMode, ThemeKey, TThemeMode } from './ThemeConstants'

export default function ThemeModeProvider({ children }: TReactChildren) {
  const [localStorage] = useLocalStorage<TThemeMode>(ThemeKey, LightMode)
  const [theme, setTheme] = useState<TThemeMode>(localStorage)

  attachThemeClass(theme)

  return theme ? <Context.Provider value={[theme, setTheme]}>{children}</Context.Provider> : null
}
