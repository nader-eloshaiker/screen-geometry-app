import { useContext } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import { attachThemeClass, LightMode, ThemeKey, TThemeMode } from './ThemeConstants'
import { Context } from './ThemeModeProvider'

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
