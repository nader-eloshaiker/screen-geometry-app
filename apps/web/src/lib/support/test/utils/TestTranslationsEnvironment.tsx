import { IntlProvider } from 'react-intl'

// vi.mock('react-intl', () => ({
//   IntlProvider: vi.fn(({ children }) => <div data-testid='Intl-provider'>{children}</div>),
// }))

export const TestTranslationsEnvironment = ({ children }: { children: React.ReactNode }) => (
  <IntlProvider locale='en' messages={{}} defaultLocale='en'>
    {children}
  </IntlProvider>
)
