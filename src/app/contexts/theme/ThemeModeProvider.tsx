import { attachThemeClass, LightMode, ThemeKey, TThemeMode } from '@app/components/theme/ThemeManager'
import useLocalStorage from '@app/hooks/useLocalStorage'
import { ThemeModeContext } from './ThemeModeContext'

export const ThemeModeProvider = ({ children, initialise }: TReactChildren & { initialise?: TThemeMode }) => {
  const [theme, setTheme] = useLocalStorage<TThemeMode>(ThemeKey, initialise ?? LightMode)

  attachThemeClass(theme)

  return theme ? <ThemeModeContext.Provider value={[theme, setTheme]}>{children}</ThemeModeContext.Provider> : null
}
