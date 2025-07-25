import { QueryProvider } from '@/app/hooks/query/QueryProvider'
import { AppRouterProvider } from '@/app/hooks/router/AppRouterProvider'
import { ScreenProvider } from '@/app/hooks/screen/ScreenProvider'
import { ThemeProvider } from '@/app/hooks/theme/ThemeProvider'
import { PageLoaderProvider, usePageLoader } from '@screengeometry/lib-ui/hooks/pageloader'
import { PageLoader } from '@screengeometry/lib-ui/pageloader'
import { EnvironmentConfig } from './components/envconfig/EnvironmentConfig'
import { TranslationsEnvironment } from './components/envtranslations/EnvironmentTranslations'

const configReadyKey = 'configReadyKey'
const translationsReadyKey = 'translationsReadyKey'

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
    <PageLoaderProvider onAppMountComponents={[configReadyKey, translationsReadyKey]}>
      <EnvironmentConfig configReadyKey={configReadyKey}>
        <TranslationsEnvironment translationsReadyKey={translationsReadyKey}>
          <ThemeProvider>
            <ScreenProvider>
              <Application />
            </ScreenProvider>
          </ThemeProvider>
        </TranslationsEnvironment>
      </EnvironmentConfig>
    </PageLoaderProvider>
  </QueryProvider>
  // </ErrorBoundary>
)
