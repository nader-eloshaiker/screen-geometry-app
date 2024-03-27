import { QueryClient } from '@tanstack/react-query'
import axios from 'axios'

const finalOptions = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: !import.meta.env.NODE_ENV, // turn off retries for unit testing
    },
  },
}
export const queryClient = new QueryClient(finalOptions)
export const baseUrl = import.meta.env.VITE_API_URL ?? 'http://dev.api.screengeometry.com'
axios.defaults.baseURL = baseUrl
