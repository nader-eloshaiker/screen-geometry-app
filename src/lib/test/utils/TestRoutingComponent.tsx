import { QueryProvider } from '@/app/contexts/Query/QueryProvider'
import { ScreenProvider } from '@/app/contexts/Screen/ScreenProvider'
import { ThemeProvider } from '@/app/contexts/theme/ThemeProvider'
import { NotificationProvider } from '@/lib/ui/notification'
import { StrictMode } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

export const TestRoutingComponent = ({ router }: { router: ReturnType<typeof createMemoryRouter> }) => {
  return (
    <StrictMode>
      <HelmetProvider>
        <QueryProvider>
          <ThemeProvider>
            <NotificationProvider>
              <ScreenProvider>
                <RouterProvider router={router} />
              </ScreenProvider>
            </NotificationProvider>
          </ThemeProvider>
        </QueryProvider>
      </HelmetProvider>
    </StrictMode>
  )
}
