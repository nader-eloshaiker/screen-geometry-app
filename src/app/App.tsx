import { QueryProvider } from '@/app/contexts/Query/QueryProvider'
import { ScreenProvider } from '@/app/contexts/Screen/ScreenProvider'
import { ThemeProvider } from '@/app/contexts/theme/ThemeProvider'
import AppRouterProvider from '@/app/routes/AppRouterProvider'
import { NotificationProvider } from '@/lib/ui/notification'
import '../index.css'

export const App = () => (
  <QueryProvider>
    <ThemeProvider>
      <NotificationProvider>
        <ScreenProvider>
          <AppRouterProvider />
        </ScreenProvider>
      </NotificationProvider>
    </ThemeProvider>
  </QueryProvider>
)
