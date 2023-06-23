import React from 'react';
import './App.css';
import { Typography, Link, Container, Box } from '@mui/material';
import ProTip from './components/ProTip';
import ThemeModeToggle from './components/ThemeMode/ThemeModeToggle';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

function App() {
  return (
    <div className="App">
      <ThemeModeToggle title="Dark Mode"/>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Material UI Create React App example in TypeScript
          </Typography>
          <ProTip />
          <Copyright />
        </Box>
      </Container>
    );
    </div>
  );
}

export default App;
