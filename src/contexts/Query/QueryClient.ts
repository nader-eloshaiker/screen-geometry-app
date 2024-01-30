import { QueryClient } from '@tanstack/react-query'
import { QueryTestOptions } from '@test/utils/QueryTestOptions'

const finalOptions = import.meta.env.NODE_ENV ? QueryTestOptions : {}
export const queryClient = new QueryClient(finalOptions)
