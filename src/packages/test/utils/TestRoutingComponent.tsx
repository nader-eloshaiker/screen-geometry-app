import { QueryProvider } from '@app/contexts/Query/QueryProvider'
import { ScreenProvider } from '@app/contexts/Screen/ScreenProvider'
import { ThemeModeProvider } from '@app/contexts/theme/ThemeModeProvider'
import { NotificationProvider } from '@packages/ui/notification'
import { StrictMode } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

export const TestRoutingComponent = ({ router }: { router: ReturnType<typeof createMemoryRouter> }) => {
  return (
    <StrictMode>
      <HelmetProvider>
        <QueryProvider>
          <ThemeModeProvider>
            <NotificationProvider>
              <ScreenProvider>
                <RouterProvider router={router} />
              </ScreenProvider>
            </NotificationProvider>
          </ThemeModeProvider>
        </QueryProvider>
      </HelmetProvider>
    </StrictMode>
  )
}
