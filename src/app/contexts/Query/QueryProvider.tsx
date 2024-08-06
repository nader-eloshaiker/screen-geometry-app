import { initDB } from '@packages/server/db/db'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useEffect, useState } from 'react'
import { queryClient } from './QueryClient'

type Props = TReactChildren

export const QueryProvider = ({ children }: Props) => {
  const [_, setDBStatus] = useState(false)
  useEffect(() => {
    const connectToDB = async () => {
      return await initDB()
    }

    connectToDB().then(setDBStatus).catch(console.error)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  )
}
