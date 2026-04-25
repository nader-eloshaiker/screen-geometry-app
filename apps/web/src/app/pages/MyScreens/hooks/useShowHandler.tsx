import { useShowScreenEffect } from '@/app/hooks/api/useShowScreenEffect'
import { queryClient } from '@/app/stores/query/QueryClient'
import { getGetScreenListQueryKey, useShowScreen } from '@screengeometry/lib-api/spec'

export type ShowHandler = ReturnType<typeof useShowScreen>

export const useShowHandler = (): ShowHandler => {
  const query = useShowScreen({
    mutation: {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getGetScreenListQueryKey() }),
    },
  })
  useShowScreenEffect(query)

  return query
}
