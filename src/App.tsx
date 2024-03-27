import { QueryProvider } from '@local/contexts/Query/QueryProvider'
import { ScreenProvider } from '@local/contexts/Screen/ScreenProvider'
import { ThemeModeProvider } from '@local/contexts/theme/ThemeModeProvider'
import AppRouterProvider from '@local/routes/AppRouterProvider'
import { NotificationProvider } from '@packages/uilibrary/notification'
import './index.css'

export const App = () => {
  return (
    <QueryProvider>
      <ThemeModeProvider>
        <NotificationProvider>
          <ScreenProvider>
            <AppRouterProvider />
          </ScreenProvider>
        </NotificationProvider>
      </ThemeModeProvider>
    </QueryProvider>
  )
}
