import { attachThemeClass, LightMode, ThemeKey, TThemeMode } from '@local/components/theme/ThemeConstants'
import { useThemeModeContext } from '@local/contexts/theme/useThemeModeContext'
import useLocalStorage from './useLocalStorage'

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
