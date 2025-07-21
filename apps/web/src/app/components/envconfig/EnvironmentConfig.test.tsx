import { renderWithUserEvents } from '@/lib/support/test/utils/RenderWithUserEvents'
import { assetAxiosInstance, serverAxiosInstance } from '@screengeometry/lib-api/apiClient'
import * as configuration from '@screengeometry/lib-api/spec'
import * as designsystem from '@screengeometry/lib-ui/pageloader'
import { vi } from 'vitest'
import { EnvironmentConfig, EnvironmentConfigLoaderKey } from './EnvironmentConfig'

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

const mockPageLoader = vi
  .spyOn(designsystem, 'PageLoader')
  .mockReturnValue(<div data-testid='loaderWithIcon'>Loading...</div>)

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

    const { getByTestId, queryByText } = await renderWithUserEvents(
      <designsystem.PageLoaderProvider onAppMountComponents={[EnvironmentConfigLoaderKey]}>
        <EnvironmentConfig>
          <div>Test Child</div>
        </EnvironmentConfig>
      </designsystem.PageLoaderProvider>
    )

    expect(mockPageLoader).toHaveBeenCalled()
    expect(getByTestId('loaderWithIcon')).toBeInTheDocument()

    expect(queryByText('Test Child')).not.toBeInTheDocument()
  })

  it('throws error when there is an error fetching config data', () => {
    useGetConfigSpy.mockReturnValue({
      data: undefined,
      error: new Error('API error'),
      isFetched: false,
    } as ReturnType<typeof configuration.useGetConfig>)

    expect(() => {
      renderWithUserEvents(
        <designsystem.PageLoaderProvider onAppMountComponents={[EnvironmentConfigLoaderKey]}>
          <EnvironmentConfig>
            <div>Test Child</div>
          </EnvironmentConfig>
        </designsystem.PageLoaderProvider>
      )
    }).toThrow('Could not render. Error fetching config data.')
  })

  it('throws error when data is undefined but isFetched is true', () => {
    useGetConfigSpy.mockReturnValue({
      data: undefined,
      error: null,
      isFetched: true,
    } as ReturnType<typeof configuration.useGetConfig>)

    expect(() => {
      renderWithUserEvents(
        <designsystem.PageLoaderProvider onAppMountComponents={[EnvironmentConfigLoaderKey]}>
          <EnvironmentConfig>
            <div>Test Child</div>
          </EnvironmentConfig>
        </designsystem.PageLoaderProvider>
      )
    }).toThrow('Could not render. Error fetching config data.')
  })

  it('configures API instances and renders children when config data is available', async () => {
    const mockEnvData = configuration.getGetConfigResponseMock()

    const { getByText, queryByTestId } = await renderWithUserEvents(
      <designsystem.PageLoaderProvider onAppMountComponents={[EnvironmentConfigLoaderKey]}>
        <EnvironmentConfig>
          <div>Test Child</div>
        </EnvironmentConfig>
      </designsystem.PageLoaderProvider>
    )

    expect(serverAxiosInstance.defaults.baseURL).toBe(mockEnvData.SERVER_API_URL)
    expect(assetAxiosInstance.defaults.baseURL).toBe(mockEnvData.SERVER_API_URL)

    expect(getByText('Test Child')).toBeInTheDocument()
    expect(queryByTestId('loaderWithIcon')).not.toBeInTheDocument()
  })

  it('handles update to envData correctly', async () => {
    // Start with no data
    const initialMockReturn = {
      data: undefined,
      error: null,
      isFetched: false,
    } as ReturnType<typeof configuration.useGetConfig>

    useGetConfigSpy.mockReturnValue(initialMockReturn)

    const { rerender, getByTestId, getByText, queryByTestId } = await renderWithUserEvents(
      <designsystem.PageLoaderProvider onAppMountComponents={[EnvironmentConfigLoaderKey]}>
        <EnvironmentConfig>
          <div>Test Child</div>
        </EnvironmentConfig>
      </designsystem.PageLoaderProvider>
    )

    // Initially should show PageLoader
    expect(getByTestId('loaderWithIcon')).toBeInTheDocument()

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
      <designsystem.PageLoaderProvider onAppMountComponents={[EnvironmentConfigLoaderKey]}>
        <EnvironmentConfig>
          <div>Test Child</div>
        </EnvironmentConfig>
      </designsystem.PageLoaderProvider>
    )

    // Now should have configured API URLs
    expect(serverAxiosInstance.defaults.baseURL).toBe(updatedMockData.SERVER_API_URL)
    expect(assetAxiosInstance.defaults.baseURL).toBe(updatedMockData.SERVER_API_URL)

    // Children should now be rendered and PageLoader gone
    expect(getByText('Test Child')).toBeInTheDocument()
    expect(queryByTestId('loaderWithIcon')).not.toBeInTheDocument()
  })
})
