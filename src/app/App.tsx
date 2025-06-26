import { QueryProvider } from '@/app/contexts/Query/QueryProvider'
import { ScreenProvider } from '@/app/contexts/Screen/ScreenProvider'
import { AppRouterProvider } from '@/app/contexts/router/AppRouterProvider'
import { ThemeProvider } from '@/app/contexts/theme/ThemeProvider'
import '../index.css'

export const App = () => (
  // <ErrorBoundary
  //   FallbackComponent={ErrorFallback}
  //   onError={(error: Error, info: ErrorInfo) => console.error(error.message, info.componentStack)}
  // >
  <QueryProvider>
    <ThemeProvider>
      <ScreenProvider>
        <AppRouterProvider />
      </ScreenProvider>
    </ThemeProvider>
  </QueryProvider>
  // </ErrorBoundary>
)
