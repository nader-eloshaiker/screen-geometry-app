import { match } from '@formatjs/intl-localematcher'
import { Translations, useGetTranslations } from '@screengeometry/lib-api/spec'
import { usePageLoader } from '@screengeometry/lib-ui/hooks/pageloader'
import { useEffect, useState } from 'react'
import { IntlProvider } from 'react-intl'
import { getBrowserLocales } from './BrowserLocales'

const defaultLocale = 'en'
const supportedlocales: Array<string> = ['en', 'de', 'es']
console.log('supportedlocales', getBrowserLocales())
console.log('match', match(getBrowserLocales(), supportedlocales, defaultLocale))

export const TranslationsEnvironment = ({
  children,
  translationsReadyKey,
}: TReactChildren & { translationsReadyKey: string }) => {
  const [supportedLocale] = useState(match(getBrowserLocales(), supportedlocales, defaultLocale))
  const { setPageLoading } = usePageLoader()

  const { data, error, isFetched } = useGetTranslations(supportedLocale)
  const [messages, setMessages] = useState<Partial<Translations>>({})

  useEffect(() => {
    if (error) {
      throw new Error('Could not render. Error fetching translation data.')
    }
  }, [error, setPageLoading, translationsReadyKey])

  useEffect(() => {
    if (data === undefined && isFetched) {
      throw new Error('Could not render. Error translation data missing.')
    }

    if (isFetched) {
      setPageLoading({ action: 'idle', componentId: translationsReadyKey })
    }

    if (data) {
      setMessages(data)
    }
  }, [data, isFetched, setPageLoading, translationsReadyKey])

  return (
    <IntlProvider locale={supportedLocale} messages={messages} defaultLocale={defaultLocale}>
      {children}
    </IntlProvider>
  )
}
