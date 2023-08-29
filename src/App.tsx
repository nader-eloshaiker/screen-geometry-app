import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationProvider } from './contexts/Notification/NotificationProvider.tsx'
import { ScreenProvider } from './contexts/Screen/ScreenProvider.tsx'
import { SearchProvider } from './contexts/Search/SearchProvider.tsx'
import { ThemeModeProvider } from './contexts/theme/ThemeModeProvider.tsx'
import './index.css'
import AppRouterProvider from './routes/AppRouterProvider.tsx'

const queryClient = new QueryClient()

export const App = () => {
  return (
    <ThemeModeProvider>
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <ScreenProvider>
            <SearchProvider>
              <AppRouterProvider />
            </SearchProvider>
          </ScreenProvider>
        </NotificationProvider>
      </QueryClientProvider>
    </ThemeModeProvider>
  )
}
