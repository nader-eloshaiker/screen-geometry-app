import * as translations from '@screengeometry/lib-api/spec'
import { getGetTranslationsResponseMock, useGetTranslations } from '@screengeometry/lib-api/spec'
import { PageLoaderProvider } from '@screengeometry/lib-ui/pageloader'
import { render } from '@testing-library/react'
import { vi } from 'vitest'
import { EnvTranslationProvider } from './EnvTranslationProvider'

vi.mock('react-intl', () => ({
  IntlProvider: vi.fn(({ children }) => <div data-testid='Intl-provider'>{children}</div>),
}))

const TestHarness = ({ children }: { children: React.ReactNode }) => (
  <PageLoaderProvider initialLoadingKeys={['aaa']}>
    <EnvTranslationProvider translationsReadyKey={'aaa'}>{children}</EnvTranslationProvider>
  </PageLoaderProvider>
)

describe('#EnvironmentTranslations', () => {
  const useGetTranslationSpy = vi.spyOn(translations, 'useGetTranslations')

  // Mock console.error to prevent error output in test
  const originalConsoleError = console.error
  beforeEach(() => {
    useGetTranslationSpy.mockReturnValue({
      data: getGetTranslationsResponseMock(),
      isFetched: true,
    } as ReturnType<typeof translations.useGetTranslations>)

    console.error = vi.fn()
  })

  afterEach(() => {
    console.error = originalConsoleError
  })

  describe('when data is not available', () => {
    it('renders loading indicator initially', () => {
      vi.mocked(useGetTranslations).mockReturnValue({
        data: undefined,
        error: null,
        isFetched: false,
      } as ReturnType<typeof useGetTranslations>)

      const test = render(
        <PageLoaderProvider initialLoadingKeys={['aaa']}>
          <EnvTranslationProvider translationsReadyKey={'aaa'}>
            <div>Child Component</div>
          </EnvTranslationProvider>
        </PageLoaderProvider>
      )

      expect(test.getByText('Child Component')).toBeInTheDocument()
      expect(useGetTranslationSpy).toHaveBeenCalledWith('en', {
        query: {
          enabled: false,
        },
      })
    })

    it('throws an error if there is an error fetching translation data', () => {
      vi.mocked(useGetTranslations).mockReturnValue({
        data: undefined,
        error: new Error('Error fetching translation data'),
        isFetched: true,
      } as ReturnType<typeof useGetTranslations>)

      expect(() => render(<div>Child Component</div>, { wrapper: TestHarness })).toThrow(
        'Could not render. Error fetching translation data.'
      )
    })

    it('throws an error if there is an error fetching translation data', () => {
      vi.mocked(useGetTranslations).mockReturnValue({
        data: null,
        error: new Error('Error fetching translation data'),
        isFetched: true,
      } as ReturnType<typeof useGetTranslations>)

      expect(() => render(<div>Child Component</div>, { wrapper: TestHarness })).toThrow(
        'Could not render. Error fetching translation data.'
      )
    })

    it('throws an error if data is undefined and isFetched is true', () => {
      vi.mocked(useGetTranslations).mockReturnValue({
        data: undefined,
        error: new Error('Error fetching translation data'),
        isFetched: true,
      } as ReturnType<typeof useGetTranslations>)

      expect(() => render(<div>Child Component</div>, { wrapper: TestHarness })).toThrow(
        'Could not render. Error fetching translation data.'
      )
    })
  })
})
