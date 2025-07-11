import { QueryClient, QueryClientConfig } from '@tanstack/react-query'
import axios, { isAxiosError } from 'axios'

const MAX_RETRIES = 3

const finalOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retryDelay: (attemptIndex) => Math.min(500 * attemptIndex, 1500),
      retry: (failureCount, error) => {
        if (failureCount > MAX_RETRIES) {
          return false
        }

        // Only retry on server errors (500-599 status codes)
        if (isAxiosError(error)) {
          // leaving this commented out for debugging purposes
          // console.log(`Aborting retry due to ${error.response?.status} status`)
          const statusCode = error.response?.status ?? 0
          const isServerError = statusCode >= 500 && statusCode < 600

          // Only retry on server errors
          return isServerError
        }

        return false
      },
    },
  },
}
export const queryClient = new QueryClient(finalOptions)
export const baseUrl = import.meta.env.VITE_API_URL ?? 'http://dev.api.screengeometry.com'
axios.defaults.baseURL = baseUrl
