import { QueryProvider } from '@app/contexts/Query/QueryProvider'
import { ScreenProvider } from '@app/contexts/Screen/ScreenProvider'
import { ThemeModeProvider } from '@app/contexts/theme/ThemeModeProvider'
import AppRouterProvider from '@app/routes/AppRouterProvider'
import { NotificationProvider } from '@packages/uilibrary/notification'
import '../index.css'

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
