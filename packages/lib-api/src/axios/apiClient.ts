import { default as Axios, AxiosInstance, AxiosRequestConfig } from 'axios'
import { v4 } from 'uuid'

// Generate a random jwt token just to make the api calls look legit
let _accessTokenResolver: (() => Promise<string>) | undefined

export const setAccessTokenResolver = (fn: (() => Promise<string>) | undefined) => {
  _accessTokenResolver = fn
}

const makeBaseHeaders = () => ({
  accept: 'application/json',
  'content-type': 'application/json',
})
const makeCorrelationIdHeader = () => ({
  'x-correlation-id': v4(),
})

export const serverAxiosInstance = Axios.create({
  // baseURL: `${apiRoutes.apiUrl}${apiRoutes.apiPathVer}`, set in QueryClient.ts
  timeout: 2000,
  headers: { ...makeBaseHeaders() },
})

export const assetAxiosInstance = Axios.create({
  // baseURL: `${apiRoutes.apiUrl}${apiRoutes.apiPathVer}`, set in QueryClient.ts
  timeout: 2000,
  headers: { ...makeBaseHeaders() },
})

const baseApiClient = async <T>({
  requestConfig,
  instance,
  getAccessToken,
}: {
  requestConfig: AxiosRequestConfig
  instance: AxiosInstance
  getAccessToken?: () => Promise<string>
}): Promise<T> => {
  const source = Axios.CancelToken.source()
  const accessToken = await getAccessToken?.()

  const { data } = await instance({
    ...requestConfig,
    headers: {
      ...requestConfig.headers,
      ...makeCorrelationIdHeader(),
      ...(accessToken && { authorization: `Bearer ${accessToken}` }),
    },
    cancelToken: source.token,
  })

  return data as T
}

export const serverApiClient = <T>(requestConfig: AxiosRequestConfig): Promise<T> =>
  baseApiClient({ requestConfig, instance: serverAxiosInstance, getAccessToken: _accessTokenResolver })

export const assetApiClient = <T>(requestConfig: AxiosRequestConfig): Promise<T> =>
  baseApiClient({ requestConfig, instance: assetAxiosInstance })
