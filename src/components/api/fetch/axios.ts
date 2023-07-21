import axios from 'axios'
import { routes } from '../ApiRouteSchema'
import { generateStub } from './stub'

export const axiosInstance = axios.create({
  baseURL: routes.baseUrl,
  timeout: 2000,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
})
export const axiosMock = generateStub(axiosInstance)
