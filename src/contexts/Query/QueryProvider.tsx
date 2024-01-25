import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { QueryTestOptions } from '@test/utils/QueryTestOptions'

export const QueryProvider = ({ children }: TReactChildren) => {
  const finalOptions = process.env.VITEST === 'true' ? QueryTestOptions : {}
  const queryClient = new QueryClient(finalOptions)

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
