import { renderWithUserEvents } from '@/test/utils/RenderWithUserEvents'
import { assetAxiosInstance, serverAxiosInstance } from '@screengeometry/lib-api/apiClient'
import * as configuration from '@screengeometry/lib-api/spec'
import { PageLoader, PageLoaderProvider, usePageLoader } from '@screengeometry/lib-ui/pageloader'
import { render, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { EnvConfigProvider } from './EnvConfigProvider'

vi.mock('@screengeometry/lib-api/apiClient', () => ({
  serverAxiosInstance: {
    defaults: {
      baseURL: '',
    },
  },
  assetAxiosInstance: {
    defaults: {
      baseURL: '',
    },
  },
  setAccessTokenResolver: () => Promise.resolve('accessToken'),
}))

const TestLoadingComponent = () => {
  const { isPageLoading } = usePageLoader()

  return isPageLoading ? <PageLoader message='Loading Config ...' /> : <div data-testid='test-child'>Test Child</div>
}

describe('#ConfiguredEnvironment', () => {
  const useGetConfigSpy = vi.spyOn(configuration, 'useGetConfig')

  // Mock console.error to prevent error output in test
  const originalConsoleError = console.error
  beforeEach(() => {
    useGetConfigSpy.mockReturnValue({
      data: configuration.getGetConfigResponseMock(),
      isFetched: true,
    } as ReturnType<typeof configuration.useGetConfig>)

    console.error = vi.fn()
  })

  afterEach(() => {
    console.error = originalConsoleError
  })

  it('renders PageLoader initially when not configured', async () => {
    useGetConfigSpy.mockReturnValue({
      data: undefined,
      error: null,
      isFetched: false,
    } as ReturnType<typeof configuration.useGetConfig>)

    const { container, queryByText } = render(
      <PageLoaderProvider initialLoadingKeys={['aaa']}>
        <EnvConfigProvider configReadyKey='aaa'>
          <TestLoadingComponent />
        </EnvConfigProvider>
      </PageLoaderProvider>
    )

    expect(container.querySelector('[data-slot="page-loader"]')).toBeInTheDocument()

    expect(queryByText('Test Child')).not.toBeInTheDocument()
  })

  it('throws error when there is an error fetching config data', () => {
    useGetConfigSpy.mockReturnValue({
      data: undefined,
      error: new Error('API error'),
      isFetched: true,
    } as ReturnType<typeof configuration.useGetConfig>)

    expect(() => {
      render(
        <PageLoaderProvider initialLoadingKeys={['aaa']}>
          <EnvConfigProvider configReadyKey='aaa'>
            <TestLoadingComponent />
          </EnvConfigProvider>
        </PageLoaderProvider>
      )
    }).toThrow('Could not render. Error fetching config data.')
  })

  it('throws error when data is undefined but isFetched is true', () => {
    useGetConfigSpy.mockReturnValue({
      data: undefined,
      error: undefined,
      isFetched: true,
    } as ReturnType<typeof configuration.useGetConfig>)

    expect(() => {
      render(
        <PageLoaderProvider initialLoadingKeys={['aaa']}>
          <EnvConfigProvider configReadyKey='aaa'>
            <TestLoadingComponent />
          </EnvConfigProvider>
        </PageLoaderProvider>
      )
    }).toThrow('Could not render. Error fetching config data.')
  })

  it('configures API instances and renders children when config data is available', async () => {
    const mockEnvData = configuration.getGetConfigResponseMock()
    const mockQuery = {
      data: mockEnvData,
      error: null,
      isFetched: true,
      isLoading: false,
    } as ReturnType<typeof configuration.useGetConfig>

    useGetConfigSpy.mockReturnValue(mockQuery)

    const { getByTestId, queryByTestId } = render(
      <PageLoaderProvider initialLoadingKeys={['aaa']}>
        <EnvConfigProvider configReadyKey='aaa'>
          <TestLoadingComponent />
        </EnvConfigProvider>
      </PageLoaderProvider>
    )

    await waitFor(() => {
      expect(queryByTestId('page-loader')).not.toBeInTheDocument()
    })

    expect(serverAxiosInstance.defaults.baseURL).toBe(mockEnvData.SERVER_API_URL)
    expect(assetAxiosInstance.defaults.baseURL).toBe('https://www.example.com')
    expect(getByTestId('test-child')).toBeInTheDocument()
  })

  it('handles update to envData correctly', async () => {
    // Start with no data
    const initialMockReturn = {
      data: undefined,
      error: null,
      isFetched: false,
    } as ReturnType<typeof configuration.useGetConfig>

    useGetConfigSpy.mockReturnValue(initialMockReturn)

    const { rerender, getByText, queryByTestId, container } = await renderWithUserEvents(
      <PageLoaderProvider initialLoadingKeys={['aaa']}>
        <EnvConfigProvider configReadyKey='aaa'>
          <TestLoadingComponent />
        </EnvConfigProvider>
      </PageLoaderProvider>
    )

    // Initially should show PageLoader
    expect(container.querySelector('[data-slot="page-loader"]')).toBeInTheDocument()

    // Then update with data
    const updatedMockData = {
      SERVER_API_URL: 'https://api.example.com',
      GA_TRACKING_ID: 'test-tracking-id',
      ENV_TYPE: 'dev',
    }

    useGetConfigSpy.mockReturnValue({
      data: updatedMockData,
      error: null,
      isFetched: true,
    } as ReturnType<typeof configuration.useGetConfig>)

    // Rerender the component with the new mock return value
    rerender(
      <PageLoaderProvider initialLoadingKeys={['aaa']}>
        <EnvConfigProvider configReadyKey='aaa'>
          <TestLoadingComponent />
        </EnvConfigProvider>
      </PageLoaderProvider>
    )

    await waitFor(() => {
      expect(queryByTestId('page-loader')).not.toBeInTheDocument()
    })

    // Now should have configured API URLs
    expect(serverAxiosInstance.defaults.baseURL).toBe(updatedMockData.SERVER_API_URL)
    expect(assetAxiosInstance.defaults.baseURL).toBe('https://www.example.com')

    // Children should now be rendered and PageLoader gone
    expect(getByText('Test Child')).toBeInTheDocument()
  })
})
