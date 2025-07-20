import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './QueryClient'

export const QueryProvider = ({ children }: TReactChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)
