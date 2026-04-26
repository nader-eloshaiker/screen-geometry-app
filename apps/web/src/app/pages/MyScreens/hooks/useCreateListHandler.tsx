import { useCreateScreenListEffect } from '@/app/hooks/api/useCreateScreenListEffect'
import { queryClient } from '@/app/stores/query/QueryClient'
import { getGetScreenListQueryKey, useCreateScreenList } from '@screengeometry/lib-api/spec'

export type CreateListHandler = ReturnType<typeof useCreateScreenList>

export const useCreateListhandler = (): CreateListHandler => {
  const query = useCreateScreenList({
    mutation: {
      // invalidate getGetScreenListQueryKey to force refetch
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getGetScreenListQueryKey() }),
    },
  })
  useCreateScreenListEffect(query)

  return query
}
