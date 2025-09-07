import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './QueryClient'

export const QueryProvider = ({ children }: React.PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)
