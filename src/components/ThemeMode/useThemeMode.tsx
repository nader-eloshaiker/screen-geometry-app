import { useContext } from 'react'
import { Context, LightMode, TThemeMode, ThemeKey, attachThemeClass } from './ThemeConstants'
import useLocalStorage from '../../hooks/useLocalStorage'

export const useThemeMode = (): [TThemeMode, (value: TThemeMode) => void] => {
  const [_, setLocalStorage] = useLocalStorage<TThemeMode>(ThemeKey, LightMode)
  const [themeMode, setTheme] = useContext(Context)

  const setThemeMode = (value: TThemeMode) => {
    attachThemeClass(value)
    setTheme(value)
    setLocalStorage(value)
  }

  return [themeMode, setThemeMode]
}
