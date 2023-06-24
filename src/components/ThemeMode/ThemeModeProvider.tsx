import { createContext, useContext, useState } from 'react'
import { LightMode, TThemeMode, ThemeKey } from './ThemeConstants'
import useLocalStorage from '../../hooks/useLocalStorage'

const applyThemeMode = (newTheme: TThemeMode) => {
  const root = window.document.documentElement
  root.classList.add(newTheme)
}

const replaceThemeMode = (newTheme: TThemeMode, prevTheme: TThemeMode) => {
  const root = window.document.documentElement
  root.classList.remove(prevTheme)
  root.classList.add(newTheme)
}

const Context = createContext<[TThemeMode, React.Dispatch<React.SetStateAction<TThemeMode>>]>([LightMode, () => {}])

const ThemeModeProvider = ({ children }: TReactChildren) => {
  const [localStorage] = useLocalStorage<TThemeMode>(ThemeKey, LightMode)
  const [theme, setTheme] = useState<TThemeMode>(localStorage)

  applyThemeMode(theme)

  return theme ? <Context.Provider value={[theme, setTheme]}>{children}</Context.Provider> : null
}

const useThemeMode = () => {
  const [_, setLocalStorage] = useLocalStorage<TThemeMode>(ThemeKey, LightMode)
  const [themeMode, setTheme] = useContext(Context)

  const setThemeMode = (value: TThemeMode) => {
    replaceThemeMode(value, themeMode)

    setTheme(value)
    setLocalStorage(value)
  }

  return [themeMode, setThemeMode] as const
}

export { ThemeModeProvider, useThemeMode }
