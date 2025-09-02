import { CountriesList, EnvTranslationContext } from '@/app/hooks/translation/EnvTranslationContext'
import useLocalStorage from '@/app/hooks/useLocalStorage'
import { match } from '@formatjs/intl-localematcher'
import { type Translations, useGetCountriesQuery, useGetTranslations } from '@screengeometry/lib-api/spec'
import { usePageLoader } from '@screengeometry/lib-ui/pageloader'
import { useEffect, useState } from 'react'
import { IntlProvider } from 'react-intl'
import {
  defaultLocale,
  getBrowserLocales,
  setTextDirection,
  supportedLanguagesArray,
  supportedlocales,
  supportedlocalesArray,
} from './LocaleHelper'

const LocaleStorageKey = 'locale-override'
const matchedLocale = match(getBrowserLocales(), supportedlocalesArray, defaultLocale)

export const EnvTranslation = ({
  children,
  translationsReadyKey,
}: React.PropsWithChildren & { translationsReadyKey: string; override?: boolean }) => {
  const [overrideLocale, setOverrideLocale] = useLocalStorage<string>(LocaleStorageKey, matchedLocale)
  const [supportedLocale] = useState(overrideLocale)
  const { setPageLoading } = usePageLoader()

  const [locale, setLocale] = useState(supportedLocale)
  const { data: translations, error: translationsError, isFetched: isTranslationsFetched } = useGetTranslations(locale)
  const [messages, setMessages] = useState<Partial<Translations>>()

  const { data: countries, error: countriesError, isFetched: isCountriesFetched } = useGetCountriesQuery()
  const [countriesList, setCountriesList] = useState<CountriesList>({})

  useEffect(() => {
    if (translationsError) {
      throw new Error('Could not render. Error fetching translation data.')
    }
  }, [translationsError])

  useEffect(() => {
    if (countriesError) {
      throw new Error('Could not render. Error fetching countries data.')
    }
  }, [countriesError])

  useEffect(() => {
    if (isCountriesFetched || isTranslationsFetched) {
      setPageLoading({ action: 'idle', componentId: translationsReadyKey })
    }
  }, [setPageLoading, isCountriesFetched, isTranslationsFetched, translationsReadyKey])

  useEffect(() => {
    if (countries) {
      // Genreate a record of countries by a supported language
      const record = supportedLanguagesArray.reduce(
        (accumulator, currentValue) => ({
          ...accumulator,
          [currentValue]: countries.countries.filter((country) =>
            country.languages.some((lang) => lang.code === currentValue)
          ),
        }),
        {}
      )
      setCountriesList(record)
    }
  }, [countries])

  useEffect(() => {
    if (translations) {
      setMessages(translations)
      setOverrideLocale(locale)
      setTextDirection(supportedlocales[locale].dir)
    }
  }, [translations, locale, setOverrideLocale])

  return (
    <EnvTranslationContext.Provider value={{ locale, setLocale, countriesList }}>
      <IntlProvider locale={locale} messages={messages} defaultLocale={defaultLocale}>
        {children}
      </IntlProvider>
    </EnvTranslationContext.Provider>
  )
}
