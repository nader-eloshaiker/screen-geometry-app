import { match } from '@formatjs/intl-localematcher'
import { Translations, useGetTranslations } from '@screengeometry/lib-api/spec'
import { usePageLoader } from '@screengeometry/lib-ui/hooks/pageloader'
import { useEffect, useState } from 'react'
import { IntlProvider } from 'react-intl'
import { getBrowserLocales } from './BrowserLocales'

const defaultLocale = 'en'
const supportedlocales: Array<string> = ['en', 'de', 'es']

export const TranslationsEnvironment = ({
  children,
  translationsReadyKey,
}: TReactChildren & { translationsReadyKey: string; override?: boolean }) => {
  const [supportedLocale] = useState(match(getBrowserLocales(), supportedlocales, defaultLocale))
  const { setPageLoading } = usePageLoader()

  const { data, error, isFetched } = useGetTranslations(supportedLocale)
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
    <IntlProvider locale={supportedLocale} messages={messages} defaultLocale={defaultLocale}>
      {children}
    </IntlProvider>
  )
}
