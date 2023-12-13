import { default as Axios, AxiosRequestConfig, default as axios } from 'axios'
import { apiRoutes } from '../../api/ApiRouteSchema'
import { generateStub } from '../../api/endpoint/stub'

const apiAxiosInstance = axios.create({
  baseURL: `${apiRoutes.apiUrl}${apiRoutes.apiPathVer}`,
  timeout: 2000,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
})

generateStub(apiAxiosInstance)

export const useApiAxios = <T>(): ((config: AxiosRequestConfig) => Promise<T>) => {
  // ToDo: implement token management
  const token = ''

  return (config: AxiosRequestConfig) => {
    const source = Axios.CancelToken.source()
    const promise = apiAxiosInstance({
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cancelToken: source.token,
    })
      .then(({ data }) => {
        console.info(`axios success: [${config.method}] ${config.url}`, '\nrequest:', config.data, '\nresponse:', data)

        return data
      })
      .catch((error) => {
        console.info(`axios termianted: [${config.method}] ${config.url}`, '\nconfig:', config)
        throw error
      })

    // @ts-expect-error this is a hack to add cancel method to promise
    promise.cancel = () => {
      source.cancel('Query was cancelled by React Query')
    }

    return promise
  }
}

export default useApiAxios