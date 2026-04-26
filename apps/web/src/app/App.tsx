import { AppRouterProvider } from '@/app/router/AppRouterProvider'
import { QueryProvider } from '@/app/stores/query/QueryProvider'
import { ScreenProvider } from '@/app/stores/screen/ScreenProvider'
import { ThemeProvider } from '@/app/stores/theme/ThemeProvider'
import { TranslationEnvProvider } from '@/app/stores/translation'
import { PageLoader, PageLoaderProvider, usePageLoader } from '@screengeometry/lib-ui/pageloader'
import { EnvConfigProvider } from './stores/config/EnvConfigProvider'
import { EnvCountryProvider } from './stores/country/EnvCountryProvider'

const Application = () => {
  const { isPageLoading } = usePageLoader()
  return isPageLoading ? <PageLoader message='Loading Config ...' /> : <AppRouterProvider />
}

export const ConfigLoaderKey = 'config'
export const TranslationsLoaderKey = 'translations'
export const CountriesLoaderKey = 'countries'

export const App = () => (
  // <ErrorBoundary
  //   FallbackComponent={ErrorFallback}
  //   onError={(error: Error, info: ErrorInfo) => console.error(error.message, info.componentStack)}
  // >
  <QueryProvider>
    <PageLoaderProvider initialLoadingKeys={[ConfigLoaderKey, ConfigLoaderKey, TranslationsLoaderKey]}>
      <EnvConfigProvider configReadyKey={ConfigLoaderKey}>
        <EnvCountryProvider countriesReadyKey={CountriesLoaderKey}>
          <TranslationEnvProvider translationsReadyKey={TranslationsLoaderKey}>
            <ThemeProvider>
              <ScreenProvider>
                <Application />
              </ScreenProvider>
            </ThemeProvider>
          </TranslationEnvProvider>
        </EnvCountryProvider>
      </EnvConfigProvider>
    </PageLoaderProvider>
  </QueryProvider>
  // </ErrorBoundary>
)
