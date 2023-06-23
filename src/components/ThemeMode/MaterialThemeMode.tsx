import { ThemeProvider } from '@emotion/react'
import { createTheme, CssBaseline } from '@mui/material'
import { red } from '@mui/material/colors'
import { DarkTheme, LightTheme } from './ThemeConstants'
import { DarkMode, TThemeMode } from './ThemeConstants'
import { useThemeMode } from './ThemeModeProvider'

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

export default function MaterialThemeMode({ children }: TReactChildren) {
  const [themeState] = useThemeMode()
  const themeOptions = createThemeConfig(themeState)

  return (
    <ThemeProvider theme={themeOptions}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
