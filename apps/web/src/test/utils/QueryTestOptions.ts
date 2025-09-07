import type { QueryClientConfig } from '@tanstack/react-query'

export const QueryTestOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false, // turn off retries for testing
    },
  },
}
