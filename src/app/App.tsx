import { QueryProvider } from '@app/contexts/Query/QueryProvider'
import { ScreenProvider } from '@app/contexts/Screen/ScreenProvider'
import { ThemeModeProvider } from '@app/contexts/theme/ThemeModeProvider'
import AppRouterProvider from '@app/routes/AppRouterProvider'
import { initDB } from '@packages/server/db/IndexedDB'
import { NotificationProvider } from '@packages/ui/notification'
import { useEffect } from 'react'
import '../index.css'

export const App = () => {
  useEffect(() => {
    const connectToDB = async () => await initDB()

    connectToDB().catch(console.error)
  }, [])

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
