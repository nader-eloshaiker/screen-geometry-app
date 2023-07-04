import { createContext, useState } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import { attachThemeClass, LightMode, ThemeKey, TThemeMode } from './ThemeConstants'

export const Context = createContext<[TThemeMode, React.Dispatch<React.SetStateAction<TThemeMode>>]>([
  LightMode,
  () => {},
])

export default function ThemeModeProvider({ children }: TReactChildren) {
  const [localStorage] = useLocalStorage<TThemeMode>(ThemeKey, LightMode)
  const [theme, setTheme] = useState<TThemeMode>(localStorage)

  attachThemeClass(theme)

  return theme ? <Context.Provider value={[theme, setTheme]}>{children}</Context.Provider> : null
}
