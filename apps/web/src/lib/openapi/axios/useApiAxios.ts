import { default as Axios, AxiosRequestConfig } from 'axios'

const apiAxiosInstance = Axios.create({
  // baseURL: `${apiRoutes.apiUrl}${apiRoutes.apiPathVer}`, set in QueryClient.ts
  timeout: 2000,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
})

// Generate a random jwt token just to make the api calls look legit
const getRandomString = (length = 10) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
const token = `${getRandomString(36)}.${getRandomString(303)}.${getRandomString(43)}`

export const useApiAxios = <T>(): ((config: AxiosRequestConfig) => Promise<T>) => {
  return (config: AxiosRequestConfig) => {
    const promise = apiAxiosInstance({
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(({ data }) => {
        return data
      })
      .catch((error) => {
        throw error
      })

    return promise
  }
}
