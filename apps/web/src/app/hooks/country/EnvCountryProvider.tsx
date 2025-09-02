import { useGetCountriesQuery, useGetLanguagesQuery } from '@screengeometry/lib-api/spec'
import { usePageLoader } from '@screengeometry/lib-ui/pageloader'
import { useEffect, useState } from 'react'
import { supportedLanguageCodes } from './CountryUtils'
import { CountryDictionary, EnvCountryContext, LanguageList } from './EnvCountryContext'

export const EnvCountryProvider = ({
  children,
  countriesReadyKey,
}: React.PropsWithChildren & { countriesReadyKey: string }) => {
  const { setPageLoading } = usePageLoader()

  const { data: countries, error: countriesError, isFetched: isCountriesFetched } = useGetCountriesQuery()
  const [countriesList, setCountriesList] = useState<CountryDictionary>()
  const [supportedLocaleCodes, setSupportedLocaleCodes] = useState<Array<string>>()

  const { data: languages, error: languagesError, isFetched: isLanguagesFetched } = useGetLanguagesQuery()
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
      setPageLoading({ action: 'idle', componentId: countriesReadyKey })
    }
  }, [setPageLoading, isCountriesFetched, isLanguagesFetched, countriesReadyKey])

  useEffect(() => {
    if (countries) {
      const codes: Array<string> = []
      // Genreate a record of countries by a supported language
      const record = supportedLanguageCodes.reduce(
        (accumulator, currentValue) => ({
          ...accumulator,
          [currentValue]: countries.countries
            .filter((country) => country.languages.some((lang) => lang.code === currentValue))
            .map((country) => {
              codes.push(`${currentValue}-${country.code}`)
              return {
                locale: `${currentValue}-${country.code}`,
                countryCode: country.code,
                languageCode: currentValue,
                name: country.name,
                native: country.native,
                emoji: country.emoji,
              }
            }),
        }),
        {}
      )
      setCountriesList(record)
      setSupportedLocaleCodes(codes)
    }
  }, [countries])

  useEffect(() => {
    if (languages) {
      // Genreate a record of countries by a supported language
      const list = supportedLanguageCodes
        .map((key) => languages.languages.find((lang) => lang.code === key))
        .filter((item) => !!item)
        .map((item) => ({
          code: item.code,
          name: item.name,
          native: item.native,
          rtl: item.rtl,
        }))
      setLanguageList(list)
    }
  }, [languages])

  return (
    <EnvCountryContext.Provider
      value={{
        countriesList: countriesList,
        languageList: languageList,
        supportedLocaleCodes,
      }}
    >
      {children}
    </EnvCountryContext.Provider>
  )
}
