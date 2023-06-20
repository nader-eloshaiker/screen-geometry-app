import { useState, useEffect } from "react"
import useLocalStorage from "./useLocalStorage"

export const TDarkMode = 'dark'
export const TLightMode = 'light'
export const TThemeKey = 'theme'
export type TThemeMode = typeof TLightMode | typeof TDarkMode

export const useDarkSide = () => {
  const [localStore, setLocalStore] = useLocalStorage<TThemeMode>(
    TThemeKey,
    TLightMode
  )
  const [theme, setTheme] = useState(localStore)
  const colorTheme: TThemeMode = theme === TDarkMode ? TLightMode : TDarkMode

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove(colorTheme)
    root.classList.add(theme)
    setLocalStore(theme)
  }, [theme, colorTheme, setLocalStore])

  return [colorTheme, setTheme] as const
}
