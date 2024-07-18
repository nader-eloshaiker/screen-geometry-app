import { attachThemeClass, TThemeMode } from '@app/components/theme/ThemeManager'
import { useThemeModeContext } from '@app/contexts/theme/useThemeModeContext'
import { useEffect } from 'react'

export const useThemeMode = (): [TThemeMode, (value: TThemeMode) => void] => {
  const [themeMode, setTheme] = useThemeModeContext()

  useEffect(() => {
    attachThemeClass(themeMode)
  }, [themeMode])

  return [themeMode, setTheme] as const
}
