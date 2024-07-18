import { attachThemeClass, LightMode, ThemeKey, TThemeMode } from '@app/components/theme/ThemeManager'
import { useThemeModeContext } from '@app/contexts/theme/useThemeModeContext'
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
