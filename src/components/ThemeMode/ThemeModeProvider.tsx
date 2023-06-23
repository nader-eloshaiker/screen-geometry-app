import { createContext, useContext } from 'react'
import { LightMode, TThemeMode, ThemeKey } from './ThemeConstants'
import useLocalStorage from '../../hooks/useLocalStorage'
import React from 'react'
  
const Context = createContext<[TThemeMode, React.Dispatch<React.SetStateAction<TThemeMode>>]>([LightMode, () => {}])

const ThemeModeProvider = ({ children }: TReactChildren) => {
  const [localStorage] = useLocalStorage<TThemeMode>(ThemeKey, LightMode)
  const [theme, setTheme] = React.useState<TThemeMode>(localStorage)

  return localStorage ? (
    <Context.Provider value={[theme, setTheme]}>
      {children}
    </Context.Provider>
  ) : null
}

const useThemeMode = () => {
  const [_, setLocalStorage] = useLocalStorage<TThemeMode>(ThemeKey, LightMode)
  const [themeMode, setTheme] = useContext(Context)

  const setThemeMode = (value: TThemeMode) => {
    setTheme(value)
    setLocalStorage(value)
  }

  return [themeMode, setThemeMode] as const
}

export { ThemeModeProvider, useThemeMode }