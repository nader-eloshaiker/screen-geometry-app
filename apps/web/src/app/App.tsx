import { QueryProvider } from '@/app/hooks/query/QueryProvider'
import { AppRouterProvider } from '@/app/hooks/router/AppRouterProvider'
import { ScreenProvider } from '@/app/hooks/screen/ScreenProvider'
import { ThemeProvider } from '@/app/hooks/theme/ThemeProvider'
import { PageLoaderProvider, usePageLoader } from '@screengeometry/lib-ui/hooks/pageloader'
import { PageLoader } from '@screengeometry/lib-ui/pageloader'
import { EnvironmentConfig } from './hooks/envConfig/EnvironmentConfig'
import { EnvTranslations } from './hooks/envTranslate/EnvTranslations'

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
      <EnvironmentConfig configReadyKey={'config'}>
        <EnvTranslations translationsReadyKey={'translations'}>
          <ThemeProvider>
            <ScreenProvider>
              <Application />
            </ScreenProvider>
          </ThemeProvider>
        </EnvTranslations>
      </EnvironmentConfig>
    </PageLoaderProvider>
  </QueryProvider>
  // </ErrorBoundary>
)
