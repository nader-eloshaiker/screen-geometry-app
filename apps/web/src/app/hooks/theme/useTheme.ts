import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) throw new Error('useThemeMode must be used within a ThemeProvider')

  return context
}
