import { QueryProvider } from '@/app/stores/query/QueryProvider'
import { AppRouterProvider } from '@/app/stores/router/AppRouterProvider'
import { ScreenProvider } from '@/app/stores/screen/ScreenProvider'
import { ThemeProvider } from '@/app/stores/theme/ThemeProvider'
import { PageLoader, PageLoaderProvider, usePageLoader } from '@screengeometry/lib-ui/pageloader'
import { EnvConfigProvider } from './stores/config/EnvConfigProvider'
import { EnvCountryProvider } from './stores/country/EnvCountryProvider'
import { EnvTranslationProvider } from './stores/translation/EnvTranslationProvider'

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
          <EnvTranslationProvider translationsReadyKey={TranslationsLoaderKey}>
            <ThemeProvider>
              <ScreenProvider>
                <Application />
              </ScreenProvider>
            </ThemeProvider>
          </EnvTranslationProvider>
        </EnvCountryProvider>
      </EnvConfigProvider>
    </PageLoaderProvider>
  </QueryProvider>
  // </ErrorBoundary>
)
