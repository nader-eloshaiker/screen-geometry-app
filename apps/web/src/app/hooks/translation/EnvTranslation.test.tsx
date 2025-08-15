import * as translations from '@screengeometry/lib-api/spec'
import { getGetTranslationsResponseMock, useGetTranslations } from '@screengeometry/lib-api/spec'
import { PageLoaderProvider } from '@screengeometry/lib-ui/pageloader'
import { render } from '@testing-library/react'
import { vi } from 'vitest'
import { EnvTranslation } from './EnvTranslation'

vi.mock('react-intl', () => ({
  IntlProvider: vi.fn(({ children }) => <div data-testid='Intl-provider'>{children}</div>),
}))

const TestHarness = ({ children }: { children: React.ReactNode }) => (
  <PageLoaderProvider initialLoadingKeys={['aaa']}>
    <EnvTranslation translationsReadyKey={'aaa'}>{children}</EnvTranslation>
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
          <EnvTranslation translationsReadyKey={'aaa'}>
            <div>Child Component</div>
          </EnvTranslation>
        </PageLoaderProvider>
      )

      expect(test.getByText('Child Component')).toBeInTheDocument()
      expect(useGetTranslationSpy).toHaveBeenCalledWith('en-US')
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
        error: null,
        isFetched: true,
      } as ReturnType<typeof useGetTranslations>)

      expect(() => render(<div>Child Component</div>, { wrapper: TestHarness })).toThrow(
        'Could not render. Error translation data missing.'
      )
    })
  })
})
