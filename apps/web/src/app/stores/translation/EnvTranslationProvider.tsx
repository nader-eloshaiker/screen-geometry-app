import useLocalStorage from '@/app/hooks/useLocalStorage'
import { defaultLanguage, defaultLocale, supportedLanguageCodes } from '@/app/stores/country/CountryUtils'
import { useEnvCountry } from '@/app/stores/country/useEnvCountry'
import { EnvTranslationContext } from '@/app/stores/translation/EnvTranslationContext'
import { match } from '@formatjs/intl-localematcher'
import { Translations, useGetTranslations } from '@screengeometry/lib-api/spec'
import { usePageLoader } from '@screengeometry/lib-ui/pageloader'
import { useEffect, useState } from 'react'
import { IntlProvider } from 'react-intl'
import { getBrowserLocales, setTextDirection } from './TranslationsUtils'

const LocaleStorageKey = 'prefered-locale'
const browserLocales = getBrowserLocales()

export const EnvTranslationProvider = ({
  children,
  translationsReadyKey,
}: React.PropsWithChildren & { translationsReadyKey: string; override?: boolean }) => {
  const { languageList, supportedLocaleCodes } = useEnvCountry()
  const [storedLocale, setStoredLocale] = useLocalStorage<string>(LocaleStorageKey)
  const { setComponentLoading } = usePageLoader()

  const [language, setLanguage] = useState<string>()
  const {
    data: translations,
    error: translationsError,
    isFetched: isTranslationsFetched,
  } = useGetTranslations(language ?? defaultLanguage, { query: { enabled: !!language } })

  useEffect(() => {
    if (translationsError) {
      throw new Error('Could not render. Error fetching translation data.')
    }
  }, [translationsError])

  useEffect(() => {
    if (isTranslationsFetched) {
      setComponentLoading({ action: 'idle', componentId: translationsReadyKey })
    } else {
      setComponentLoading({ action: 'loading', componentId: translationsReadyKey })
    }
  }, [setComponentLoading, isTranslationsFetched, translationsReadyKey])

  // handle no selelected locale -> initialize with browser locale
  useEffect(() => {
    if (!storedLocale && supportedLocaleCodes) {
      const finalLocale = match(browserLocales, supportedLocaleCodes, defaultLocale)
      setStoredLocale(finalLocale)
    }
  }, [setStoredLocale, storedLocale, supportedLocaleCodes])

  // handle locale saved -> trigger fetching of new translations
  useEffect(() => {
    if (storedLocale && supportedLanguageCodes && languageList) {
      const finalLanguage = match([storedLocale], supportedLanguageCodes, defaultLanguage)
      setLanguage(finalLanguage)
      setTextDirection(languageList.find((lang) => lang.code === finalLanguage)?.rtl ? 'rtl' : 'ltr')
    }
  }, [languageList, storedLocale])

  return (
    <EnvTranslationContext.Provider value={{ locale: storedLocale, setLocale: setStoredLocale }}>
      <IntlProvider
        locale={storedLocale ?? defaultLocale}
        messages={translations as Partial<Translations>}
        defaultLocale={defaultLocale}
      >
        {children}
      </IntlProvider>
    </EnvTranslationContext.Provider>
  )
}
