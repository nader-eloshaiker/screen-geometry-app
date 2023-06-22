import { ThemeProvider } from '@emotion/react'
import { createTheme, CssBaseline } from '@mui/material'
import { red } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { ThemeModeSwitch } from './ThemeModeSwitch'
import { DarkTheme, LightTheme } from './ThemeConstants'
import useLocalStorage from '../../hooks/useLocalStorage'
import { ThemeKey, LightMode, DarkMode, TThemeMode } from './ThemeConstants'

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

export default function ThemeModeProvider({ children }: TReactChildren) {
  const [localStorage, setLocalStorage] = useLocalStorage<TThemeMode>(ThemeKey, LightMode)
  const [themeState, setThemeState] = useState<TThemeMode>(localStorage)
  const [themeOptions, setThemeOptions] = useState<ReturnType<typeof createTheme>>(createThemeConfig(themeState))


  useEffect(() => {
    setLocalStorage(themeState)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeState])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThemeState(event.target.checked ? DarkMode : LightMode)
    setThemeOptions(createThemeConfig(event.target.checked ? DarkMode : LightMode))
  }

  return (
    <ThemeProvider theme={themeOptions}>
      <CssBaseline />
      <div>
        <label>Dark Mode</label>
        <ThemeModeSwitch
          checked={themeState === DarkMode}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'Dark Mode' }}
        />
      </div>
      {children}
    </ThemeProvider>
  );
}