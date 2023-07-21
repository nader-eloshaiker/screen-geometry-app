import React from 'react'
import ReactDOM from 'react-dom/client'
import DataProvider from './components/api/DataProvider.tsx'
import ThemeModeProvider from './components/theme/ThemeModeProvider.tsx'
import './index.css'
import reportWebVitals from './reportWebVitals.ts'
import AppRouterProvider from './routes/AppRouterProvider.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeModeProvider>
      <DataProvider>
        <AppRouterProvider />
      </DataProvider>
    </ThemeModeProvider>
  </React.StrictMode>,
)

reportWebVitals()
