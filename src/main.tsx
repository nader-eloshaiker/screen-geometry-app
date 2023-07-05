import React from 'react'
import ReactDOM from 'react-dom/client'
import ThemeModeProvider from './components/theme/ThemeModeProvider.tsx'
import './index.css'
import reportWebVitals from './reportWebVitals.ts'
import AppRouterProvider from './routes/AppRouterProvider.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeModeProvider>
      <AppRouterProvider />
    </ThemeModeProvider>
  </React.StrictMode>,
)

reportWebVitals()
