import { NotificationProvider } from '@components/common/notification/context/NotificationProvider'
import { QueryProvider } from '@contexts/Query/QueryProvider'
import { ScreenProvider } from '@contexts/Screen/ScreenProvider'
import { ThemeModeProvider } from '@contexts/theme/ThemeModeProvider'
import AppRouterProvider from '@routes/AppRouterProvider'
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
