import { QueryProvider } from '@/app/contexts/Query/QueryProvider'
import { ScreenProvider } from '@/app/contexts/Screen/ScreenProvider'
import { ThemeProvider } from '@/app/contexts/theme/ThemeProvider'
import { Toaster } from '@/lib/ui/components/toaster/Toaster'
import { StrictMode } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

export const TestRoutingComponent = ({ router }: { router: ReturnType<typeof createMemoryRouter> }) => {
  return (
    <StrictMode>
      <HelmetProvider>
        <QueryProvider>
          <ThemeProvider>
            <ScreenProvider>
              <RouterProvider router={router} />
            </ScreenProvider>
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </HelmetProvider>
    </StrictMode>
  )
}
