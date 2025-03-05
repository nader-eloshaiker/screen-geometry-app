import { QueryProvider } from '@/app/contexts/Query/QueryProvider'
import { AppRouterProvider } from '@/app/contexts/router/AppRouterProvider'
import { ScreenProvider } from '@/app/contexts/Screen/ScreenProvider'
import { ThemeProvider } from '@/app/contexts/theme/ThemeProvider'
import { Toaster } from '@/lib/ui/components/toaster/Toaster'
import { StrictMode } from 'react'
import { HelmetProvider } from 'react-helmet-async'

export const TestRoutingComponent = () => {
  return (
    <StrictMode>
      <HelmetProvider>
        <QueryProvider>
          <ThemeProvider>
            <ScreenProvider>
              <AppRouterProvider />
            </ScreenProvider>
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </HelmetProvider>
    </StrictMode>
  )
}
