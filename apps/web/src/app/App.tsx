import { QueryProvider } from '@/app/hooks/query/QueryProvider'
import { AppRouterProvider } from '@/app/hooks/router/AppRouterProvider'
import { ScreenProvider } from '@/app/hooks/screen/ScreenProvider'
import { ThemeProvider } from '@/app/hooks/theme/ThemeProvider'
import { PageLoaderProvider } from '@screengeometry/lib-ui/pageloader'
import {
  EnvironmentConfig,
  EnvironmentConfigLoaderKey,
  MockServerReadyKey,
} from './components/envconfig/EnvironmentConfig'

export const App = () => (
  // <ErrorBoundary
  //   FallbackComponent={ErrorFallback}
  //   onError={(error: Error, info: ErrorInfo) => console.error(error.message, info.componentStack)}
  // >
  <QueryProvider>
    <PageLoaderProvider onAppMountComponents={[EnvironmentConfigLoaderKey, MockServerReadyKey]}>
      <EnvironmentConfig>
        <ThemeProvider>
          <ScreenProvider>
            <AppRouterProvider />
          </ScreenProvider>
        </ThemeProvider>
      </EnvironmentConfig>
    </PageLoaderProvider>
  </QueryProvider>
  // </ErrorBoundary>
)
