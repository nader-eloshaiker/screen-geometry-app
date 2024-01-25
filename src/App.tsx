import { NotificationProvider } from '@contexts/Notification/NotificationProvider'
import { QueryProvider } from '@contexts/Query/QueryProvider'
import { ScreenProvider } from '@contexts/Screen/ScreenProvider'
import { ThemeModeProvider } from '@contexts/theme/ThemeModeProvider'
import AppRouterProvider from '@routes/AppRouterProvider'
import './index.css'

export const App = () => {
  return (
    <ThemeModeProvider>
      <QueryProvider>
        <NotificationProvider>
          <ScreenProvider>
            <AppRouterProvider />
          </ScreenProvider>
        </NotificationProvider>
      </QueryProvider>
    </ThemeModeProvider>
  )
}
