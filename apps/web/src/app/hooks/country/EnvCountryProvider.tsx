import { ConfigLoaderKey } from '@/app/App'
import { useGetCountriesQuery, useGetLanguagesQuery } from '@screengeometry/lib-api/spec'
import { usePageLoader } from '@screengeometry/lib-ui/pageloader'
import { useEffect, useState } from 'react'
import { toCountryDictionary, toLanguageList } from './CountryUtils'
import { CountryDictionary, EnvCountryContext, LanguageList } from './EnvCountryContext'

export const EnvCountryProvider = ({
  children,
  countriesReadyKey,
}: React.PropsWithChildren & { countriesReadyKey: string }) => {
  const { setComponentLoading, isComponentLoading } = usePageLoader()
  const configReady = !isComponentLoading(ConfigLoaderKey)

  const {
    data: countries,
    error: countriesError,
    isFetched: isCountriesFetched,
  } = useGetCountriesQuery(undefined, { enabled: configReady })
  const [countriesDict, setcountriesDict] = useState<CountryDictionary>()
  const [supportedLocaleCodes, setSupportedLocaleCodes] = useState<Array<string>>()

  const {
    data: languages,
    error: languagesError,
    isFetched: isLanguagesFetched,
  } = useGetLanguagesQuery(undefined, { enabled: configReady })
  const [languageList, setLanguageList] = useState<LanguageList>()

  useEffect(() => {
    if (countriesError) {
      throw new Error('Could not render. Error fetching countries data.')
    }
  }, [countriesError])

  useEffect(() => {
    if (languagesError) {
      throw new Error('Could not render. Error fetching languages data.')
    }
  }, [languagesError])

  useEffect(() => {
    if (isCountriesFetched || isLanguagesFetched) {
      setComponentLoading({ action: 'idle', componentId: countriesReadyKey })
    }
  }, [setComponentLoading, isCountriesFetched, isLanguagesFetched, countriesReadyKey])

  useEffect(() => {
    if (countries) {
      const { record, codes } = toCountryDictionary(countries.countries)
      setcountriesDict(record)
      setSupportedLocaleCodes(codes)
    }
  }, [countries])

  useEffect(() => {
    if (languages) {
      // Genreate a record of countries by a supported language
      const list = toLanguageList(languages.languages)
      setLanguageList(list)
    }
  }, [languages])

  return (
    <EnvCountryContext.Provider
      value={{
        countriesDict,
        languageList,
        supportedLocaleCodes,
      }}
    >
      {children}
    </EnvCountryContext.Provider>
  )
}
