import { NotificationProvider } from '@contexts/Notification/NotificationProvider'
import { ScreenProvider } from '@contexts/Screen/ScreenProvider'
import { ThemeModeProvider } from '@contexts/theme/ThemeModeProvider'
import AppRouterProvider from '@routes/AppRouterProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'

const queryClient = new QueryClient()

export const App = () => {
  return (
    <ThemeModeProvider>
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <ScreenProvider>
            <AppRouterProvider />
          </ScreenProvider>
        </NotificationProvider>
      </QueryClientProvider>
    </ThemeModeProvider>
  )
}
