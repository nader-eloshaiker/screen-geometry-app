import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeModeProvider } from './components/theme/context/ThemeModeProvider.tsx'
import { AppProvider } from './contexts/App/AppProvider.tsx'
import { SearchProvider } from './contexts/Search/SearchProvider.tsx'
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
