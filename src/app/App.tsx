import { QueryProvider } from '@/app/contexts/Query/QueryProvider'
import { ScreenProvider } from '@/app/contexts/Screen/ScreenProvider'
import { ThemeProvider } from '@/app/contexts/theme/ThemeProvider'
import AppRouterProvider from '@/app/routes/AppRouterProvider'
import '../index.css'

export const App = () => (
  <QueryProvider>
    <ThemeProvider>
      <ScreenProvider>
        <AppRouterProvider />
      </ScreenProvider>
    </ThemeProvider>
  </QueryProvider>
)
