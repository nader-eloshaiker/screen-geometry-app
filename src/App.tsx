import React, { useState } from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { ThemeModeSwitch } from './Styled/ThemeModeSwitch'
import CssBaseline from '@mui/material/CssBaseline';
// import ThemeSwitcher from './components/ThemeSwitcher';

function App() {
  const [theme, settheme] = useState(false);
  const darkTheme = createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            background: theme ? 'linear-gradient(#2D333B, #000000)' : 'linear-gradient(#ffffff, #E7E5E4)',
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          },
        },
      },
    },
    palette: {
      mode: theme ? 'dark' : 'light',
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    settheme(event.target.checked);
  }
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <label>Dark Mode</label>
        <ThemeModeSwitch
          checked={theme}
          onChange={handleChange}
        />
      </ThemeProvider>
    </div>
  );
}

export default App;
