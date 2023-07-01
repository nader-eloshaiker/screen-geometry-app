import React from 'react'
import ReactDOM from 'react-dom/client'
import ThemeModeProvider from './components/theme/ThemeModeProvider.tsx'
import './index.css'
import AppRouterProvider from './Providers/AppRouterProvider.tsx'
import reportWebVitals from './reportWebVitals.ts'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeModeProvider>
      <AppRouterProvider />
    </ThemeModeProvider>
  </React.StrictMode>,
)

reportWebVitals()
