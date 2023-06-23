import { createContext, useContext } from 'react'
import { DarkMode, DarkTheme, LightMode, LightTheme, TThemeMode, ThemeKey } from './ThemeConstants'
import useLocalStorage from '../../hooks/useLocalStorage'
import React from 'react'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { red } from '@mui/material/colors'

const LightBackground = `linear-gradient(${LightTheme.start}, ${LightTheme.end})`
const DarkBackground = `linear-gradient(${DarkTheme.start}, ${DarkTheme.end})`

const createThemeConfig = (themeState: TThemeMode) => createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            background: themeState === DarkMode ? DarkBackground : LightBackground,
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          },
        },
      },
    },
    palette: {
      mode: themeState,
      primary: {
        main: '#556cd6',
      },
      secondary: {
        main: '#19857b',
      },
      error: {
        main: red.A400,
      },
    },
  })

  
const Context = createContext<[TThemeMode, React.Dispatch<React.SetStateAction<TThemeMode>>]>([LightMode, () => {}])

const ThemeModeProvider = ({ children }: TReactChildren) => {
  const [localStorage] = useLocalStorage<TThemeMode>(ThemeKey, LightMode)
  const [theme, setTheme] = React.useState<TThemeMode>(localStorage)
  const themeOptions = createThemeConfig(theme)

  return localStorage ? (
    <Context.Provider value={[theme, setTheme]}>
      <ThemeProvider theme={themeOptions}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </Context.Provider>
  ) : null
}

const useThemeMode = () => {
  const [_, setLocalStorage] = useLocalStorage<TThemeMode>(ThemeKey, LightMode)
  const [themeMode, setTheme] = useContext(Context)

  const setThemeMode = (value: TThemeMode) => {
    setTheme(value)
    setLocalStorage(value)
  }

  return [themeMode, setThemeMode] as const
}

export { ThemeModeProvider, useThemeMode }