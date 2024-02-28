import { default as Axios, AxiosRequestConfig } from 'axios'

const apiAxiosInstance = Axios.create({
  // baseURL: `${apiRoutes.apiUrl}${apiRoutes.apiPathVer}`, set in QueryClient.ts
  timeout: 2000,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
})

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
        return data
      })
      .catch((error) => {
        throw error
      })

    // @ts-expect-error this is a hack to add cancel method to promise
    promise.cancel = () => {
      source.cancel('axios cancelled: signalled by React Query')
    }

    return promise
  }
}

export default useApiAxios
