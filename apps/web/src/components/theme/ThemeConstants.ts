export const DarkTheme = { start: '#2D333B', end: '#1C1917' }
export const LightTheme = { start: '#F5F5F4', end: '#D6D3D1' }

export const DarkMode = 'dark'
export const LightMode = 'light'
export const ThemeKey = 'theme'
export type TThemeMode = typeof LightMode | typeof DarkMode

const attachThemeClass = (newTheme: TThemeMode) => {
  const root = window.document.documentElement

  if (newTheme === DarkMode) {
    !root.classList.contains(DarkMode) && root.classList.add(DarkMode)
  } else {
    root.classList.contains(DarkMode) && root.classList.remove(DarkMode)
  }
  root.setAttribute('data-theme', newTheme)
}

export { attachThemeClass }
