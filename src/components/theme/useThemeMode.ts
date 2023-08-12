import useLocalStorage from '../../hooks/useLocalStorage'
import { attachThemeClass, LightMode, ThemeKey, TThemeMode } from './ThemeConstants'
import { useThemeModeContext } from './context/useThemeModeContext'

export const useThemeMode = (): [TThemeMode, (value: TThemeMode) => void] => {
  const [_, setLocalStorage] = useLocalStorage<TThemeMode>(ThemeKey, LightMode)
  const [themeMode, setTheme] = useThemeModeContext()

  const setThemeMode = (value: TThemeMode) => {
    attachThemeClass(value)
    setTheme(value)
    setLocalStorage(value)
  }

  return [themeMode, setThemeMode]
}
