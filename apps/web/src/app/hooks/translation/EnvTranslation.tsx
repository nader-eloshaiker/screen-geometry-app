import { EnvTranslationContext } from '@/app/hooks/translation/EnvTranslationContext'
import useLocalStorage from '@/app/hooks/useLocalStorage'
import { match } from '@formatjs/intl-localematcher'
import { Translations, useGetTranslations } from '@screengeometry/lib-api/spec'
import { usePageLoader } from '@screengeometry/lib-ui/hooks/pageloader'
import { useEffect, useState } from 'react'
import { IntlProvider } from 'react-intl'
import {
  defaultLocale,
  getBrowserLocales,
  setTextDirection,
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
  const { data, error, isFetched } = useGetTranslations(locale)
  const [messages, setMessages] = useState<Partial<Translations>>()

  useEffect(() => {
    if (error) {
      throw new Error('Could not render. Error fetching translation data.')
    }
  }, [error])

  useEffect(() => {
    if (messages) {
      setPageLoading({ action: 'idle', componentId: translationsReadyKey })
    }
  }, [setPageLoading, messages, translationsReadyKey])

  useEffect(() => {
    if (isFetched && !data) {
      setMessages({})
      throw new Error('Could not render. Error translation data missing.')
    }

    if (isFetched && data) {
      setMessages(data)
      setOverrideLocale(locale)
      setTextDirection(supportedlocales[locale].dir)
    }
  }, [data, isFetched, locale, setOverrideLocale])

  return (
    <EnvTranslationContext.Provider value={{ locale, setLocale }}>
      <IntlProvider locale={locale} messages={messages} defaultLocale={defaultLocale}>
        {children}
      </IntlProvider>
    </EnvTranslationContext.Provider>
  )
}
