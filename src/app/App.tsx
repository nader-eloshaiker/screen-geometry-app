import { QueryProvider } from '@app/contexts/Query/QueryProvider'
import { ScreenProvider } from '@app/contexts/Screen/ScreenProvider'
import { ThemeModeProvider } from '@app/contexts/theme/ThemeModeProvider'
import AppRouterProvider from '@app/routes/AppRouterProvider'
import { NotificationProvider } from '@packages/ui/notification'
import '../index.css'

export const App = () => (
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
