import { QueryProvider } from '@/app/hooks/query/QueryProvider'
import { AppRouterProvider } from '@/app/hooks/router/AppRouterProvider'
import { ScreenProvider } from '@/app/hooks/screen/ScreenProvider'
import { ThemeProvider } from '@/app/hooks/theme/ThemeProvider'
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
