import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppProvider } from './contexts/App/AppProvider.tsx'
import { NotificationProvider } from './contexts/Notification/NotificationProvider.tsx'
import { SearchProvider } from './contexts/Search/SearchProvider.tsx'
import { ThemeModeProvider } from './contexts/theme/ThemeModeProvider.tsx'
import './index.css'
import reportWebVitals from './reportWebVitals.ts'
import AppRouterProvider from './routes/AppRouterProvider.tsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeModeProvider>
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <AppProvider>
            <SearchProvider>
              <AppRouterProvider />
            </SearchProvider>
          </AppProvider>
        </NotificationProvider>
      </QueryClientProvider>
    </ThemeModeProvider>
  </React.StrictMode>,
)

reportWebVitals()
