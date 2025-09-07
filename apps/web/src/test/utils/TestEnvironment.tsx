import { EnvConfigContext } from '@/app/stores/config/EnvConfigContext'
import { toCountryDictionary, toLanguageList } from '@/app/stores/country/CountryUtils'
import { EnvCountryContext } from '@/app/stores/country/EnvCountryContext'
import { QueryProvider } from '@/app/stores/query/QueryProvider'
import { serverAxiosInstance } from '@screengeometry/lib-api/apiClient'
import { getGetCountriesResponseMock, getGetLanguagesResponseMock } from '@screengeometry/lib-api/gql'
import { getGetConfigResponseMock } from '@screengeometry/lib-api/spec'
import { TestTranslationsEnvironment } from './TestTranslationsEnvironment'

const config = getGetConfigResponseMock()
serverAxiosInstance.defaults.baseURL = config.SERVER_API_URL

export const TestEnvironment = ({ children }: React.PropsWithChildren) => {
  const { record, codes } = toCountryDictionary(getGetCountriesResponseMock().countries)
  const list = toLanguageList(getGetLanguagesResponseMock().languages)
  return (
    <QueryProvider>
      <EnvConfigContext.Provider value={config}>
        <EnvCountryContext.Provider value={{ countriesDict: record, languageList: list, supportedLocaleCodes: codes }}>
          <TestTranslationsEnvironment>{children}</TestTranslationsEnvironment>
        </EnvCountryContext.Provider>
      </EnvConfigContext.Provider>
    </QueryProvider>
  )
}
