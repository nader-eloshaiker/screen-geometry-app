import { EnvTranslateContext } from '@/app/hooks/envtranslate/EnvTranslateContext'
import { match } from '@formatjs/intl-localematcher'
import { Translations, useGetTranslations } from '@screengeometry/lib-api/spec'
import { usePageLoader } from '@screengeometry/lib-ui/hooks/pageloader'
import { useEffect, useState } from 'react'
import { IntlProvider } from 'react-intl'
import { defaultLocale, getBrowserLocales, supportedlocalesArray } from './LocaleHelper'

export const TranslationsEnvironment = ({
  children,
  translationsReadyKey,
}: React.PropsWithChildren & { translationsReadyKey: string; override?: boolean }) => {
  const [supportedLocale] = useState(match(getBrowserLocales(), supportedlocalesArray, defaultLocale))
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
    }
  }, [data, isFetched])

  return (
    <EnvTranslateContext.Provider value={{ locale, setLocale }}>
      <IntlProvider locale={locale} messages={messages} defaultLocale={defaultLocale}>
        {children}
      </IntlProvider>
    </EnvTranslateContext.Provider>
  )
}
