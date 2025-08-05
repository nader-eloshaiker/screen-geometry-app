import { IntlProvider } from 'react-intl'
import messages from '../../../../../public/locales/en-US.json'

// vi.mock('react-intl', () => ({
//   IntlProvider: vi.fn(({ children }) => <div data-testid='Intl-provider'>{children}</div>),
// }))

export const TestTranslationsEnvironment = ({ children }: { children: React.ReactNode }) => (
  <IntlProvider locale='en' messages={messages} defaultLocale='en'>
    {children}
  </IntlProvider>
)
