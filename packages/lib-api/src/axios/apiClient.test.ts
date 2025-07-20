import { serverApiClient, setAccessTokenResolver } from './apiClient'

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
  CancelToken: { source: vi.fn().mockReturnValue({ token: 'mockCancelToken' }) },
}))

vi.mock('axios', async (importActual) => {
  const actual = await importActual<typeof import('axios')>()

  const mockAxios = {
    default: {
      ...actual.default,
      CancelToken: mocks.CancelToken,
      create: vi.fn(() => ({
        ...actual.default.create(),
        get: mocks.get,
        post: mocks.post,
        CancelToken: mocks.CancelToken,
      })),
      interceptors: {
        request: {
          use: vi.fn(),
          eject: vi.fn(),
        },
        response: {
          use: vi.fn(),
          eject: vi.fn(),
        },
      },
    },
  }

  return mockAxios
})

describe('serverApiClient', () => {
  it.skip('should return a promise with the expected headers', async () => {
    mocks.get.mockResolvedValue({ data: { users: [{ id: 1, name: 'Test User' }] } })

    const requestConfig = {
      method: 'GET',
      url: '/example',
    }
    await serverApiClient(requestConfig)
    expect(mocks.get).toHaveBeenCalledTimes(1)
    expect(mocks.get).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: {
          'x-correlation-id': expect.any(String),
          accept: 'application/json',
        },
      })
    )
  })

  it.skip('should call the getAccessToken resolver if provided', async () => {
    mocks.get.mockResolvedValue({ data: { users: [{ id: 1, name: 'Test User' }] } })

    const requestConfig = {
      method: 'GET',
      url: '/example',
    }
    const accessTokenResolver = vi.fn(() => Promise.resolve('mock-token'))
    setAccessTokenResolver(accessTokenResolver)
    await serverApiClient(requestConfig)
    expect(accessTokenResolver).toHaveBeenCalledTimes(1)
  })

  it.skip('should not call the getAccessToken resolver if no resolver is set', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mocks.get.mockResolvedValue({ data: { users: [{ id: 1, name: 'Test User' }] } } as any)

    const requestConfig = {
      method: 'GET',
      url: '/example',
    }
    const accessTokenResolver = vi.fn(() => Promise.resolve('mock-token'))
    setAccessTokenResolver(undefined)
    await serverApiClient(requestConfig)
    expect(accessTokenResolver).not.toHaveBeenCalled()
  })

  it('should throw an error if the getAccessToken resolver returns a rejected promise', async () => {
    mocks.get.mockResolvedValue({ data: { users: [{ id: 1, name: 'Test User' }] } })

    const requestConfig = {
      method: 'GET',
      url: '/example',
    }
    const accessTokenResolver = vi.fn(() => Promise.reject(new Error('mock-error')))
    setAccessTokenResolver(accessTokenResolver)
    await expect(serverApiClient(requestConfig)).rejects.toThrowError('mock-error')
  })

  it.skip('should call the provided requestConfig.cancelToken if provided', async () => {
    const requestConfig = {
      method: 'GET',
      url: '/example',
      cancelToken: mocks.CancelToken.source(),
    }
    await serverApiClient(requestConfig)
    expect(requestConfig.cancelToken).toHaveBeenCalledTimes(1)
  })

  it.skip('should not call the provided requestConfig.cancelToken if no cancel token is set', async () => {
    const requestConfig = {
      method: 'GET',
      url: '/example',
    }
    await serverApiClient(requestConfig)
    expect(mocks.CancelToken.source).not.toHaveBeenCalled()
  })
})
