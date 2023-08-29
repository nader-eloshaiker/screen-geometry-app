import { AxiosRequestConfig, default as axios, default as Axios } from 'axios'
import { routes } from '../ApiRouteSchema'
import { generateStub } from '../endpoint/stub'

const apiAxiosInstance = axios.create({
  baseURL: routes.baseUrl + routes.basePath,
  timeout: 2000,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
})

generateStub(apiAxiosInstance)

export const useApiAxios = <T>(): ((config: AxiosRequestConfig) => Promise<T>) => {
  const token = '6fd3e689-e78f-4b20-bb78-eaa9d119b6c0' // Do what you want

  return (config: AxiosRequestConfig) => {
    const source = Axios.CancelToken.source()
    const promise = apiAxiosInstance({
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cancelToken: source.token,
    }).then(({ data }) => data)

    // @ts-expect-error this is a hack to add cancel method to promise
    promise.cancel = () => {
      source.cancel('Query was cancelled by React Query')
    }

    return promise
  }
}

export default useApiAxios
