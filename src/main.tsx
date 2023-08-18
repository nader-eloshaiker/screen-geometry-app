import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppProvider } from './contexts/App/AppProvider.tsx'
import { SearchProvider } from './contexts/Search/SearchProvider.tsx'
import { ThemeModeProvider } from './contexts/theme/ThemeModeProvider.tsx'
import './index.css'
import reportWebVitals from './reportWebVitals.ts'
import AppRouterProvider from './routes/AppRouterProvider.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeModeProvider>
      <AppProvider>
        <SearchProvider>
          <AppRouterProvider />
        </SearchProvider>
      </AppProvider>
    </ThemeModeProvider>
  </React.StrictMode>,
)

reportWebVitals()
