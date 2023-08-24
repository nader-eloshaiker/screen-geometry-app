import axios from 'axios'
import { routes } from '../ApiRouteSchema'
import { generateStub } from './stub'

export const axiosInstance = axios.create({
  baseURL: routes.baseUrl + routes.basePath,
  timeout: 2000,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
})
export const axiosInstanceMock = generateStub(axiosInstance)

// export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
//   const source = axios.CancelToken.source()
//   const promise = axiosInstance({ ...config, cancelToken: source.token }).then(({ data }) => data)

//   // @ts-expect-error this is a hack to add cancel method to promise
//   promise.cancel = () => {
//     source.cancel('Query was cancelled')
//   }

//   return promise
// }
