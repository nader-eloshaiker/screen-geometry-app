import { useDeleteScreenEffect } from '@/app/hooks/api/useDeleteScreenEffect'
import { queryClient } from '@/app/stores/query/QueryClient'
import { getGetScreenListQueryKey, useDeleteScreen } from '@screengeometry/lib-api/spec'

export type DeleteHandler = ReturnType<typeof useDeleteScreen>

export const useDeleteHandler = (): DeleteHandler => {
  const query = useDeleteScreen({
    mutation: {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getGetScreenListQueryKey() }),
    },
  })
  useDeleteScreenEffect(query)

  return query
}
