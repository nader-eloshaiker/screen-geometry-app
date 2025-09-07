import { defaultLocale } from '@/app/hooks/country/CountryUtils'
import { EnvTranslationContext } from '@/app/hooks/translation/EnvTranslationContext'
import { Translations } from '@screengeometry/lib-api/spec'
import { useState } from 'react'
import { IntlProvider } from 'react-intl'
import * as messages from '../../../public/locales/en.json'

// vi.mock('react-intl', () => ({
//   IntlProvider: vi.fn(({ children }) => <div data-testid='Intl-provider'>{children}</div>),
// }))

export const TestTranslationsEnvironment = ({ children }: { children: React.ReactNode }) => {
  const [storedLocale, setStoredLocale] = useState<string | undefined>('en-US')
  return (
    <EnvTranslationContext.Provider value={{ locale: storedLocale, setLocale: setStoredLocale }}>
      <IntlProvider locale={storedLocale!} messages={messages as Partial<Translations>} defaultLocale={defaultLocale}>
        {children}
      </IntlProvider>
    </EnvTranslationContext.Provider>
  )
}
