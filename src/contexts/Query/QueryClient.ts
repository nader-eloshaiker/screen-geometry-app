import { QueryClient } from '@tanstack/react-query'
import { QueryTestOptions } from '@test/utils/QueryTestOptions'
import axios from 'axios'

const finalOptions = import.meta.env.NODE_ENV ? QueryTestOptions : {}
export const queryClient = new QueryClient(finalOptions)
export const baseUrl = import.meta.env.VITE_API_URL ?? 'http://dev.api.screengeometry.com'
axios.defaults.baseURL = baseUrl
