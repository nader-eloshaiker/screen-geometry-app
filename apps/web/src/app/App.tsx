import { QueryProvider } from '@/app/hooks/query/QueryProvider'
import { AppRouterProvider } from '@/app/hooks/router/AppRouterProvider'
import { ScreenProvider } from '@/app/hooks/screen/ScreenProvider'
import { ThemeProvider } from '@/app/hooks/theme/ThemeProvider'
import { PageLoader, PageLoaderProvider, usePageLoader } from '@screengeometry/lib-ui/pageloader'
import { EnvConfig } from './hooks/config/EnvConfig'
import { EnvTranslation } from './hooks/translation/EnvTranslation'

const Application = () => {
  const { isPageLoading } = usePageLoader()
  return isPageLoading ? <PageLoader message='Loading Config ...' /> : <AppRouterProvider />
}

export const App = () => (
  // <ErrorBoundary
  //   FallbackComponent={ErrorFallback}
  //   onError={(error: Error, info: ErrorInfo) => console.error(error.message, info.componentStack)}
  // >
  <QueryProvider>
    <PageLoaderProvider initialLoadingKeys={['config', 'translations']}>
      <EnvConfig configReadyKey={'config'}>
        <EnvTranslation translationsReadyKey={'translations'}>
          <ThemeProvider>
            <ScreenProvider>
              <Application />
            </ScreenProvider>
          </ThemeProvider>
        </EnvTranslation>
      </EnvConfig>
    </PageLoaderProvider>
  </QueryProvider>
  // </ErrorBoundary>
)
