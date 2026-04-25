import { useCreateScreenEffect } from '@/app/hooks/api/useCreateScreenEffect'
import { queryClient } from '@/app/stores/query/QueryClient'
import { getGetScreenListQueryKey, useCreateScreen } from '@screengeometry/lib-api/spec'

export const useCreateHandler = () => {
  const query = useCreateScreen({
    mutation: {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getGetScreenListQueryKey() }),
    },
  })

  useCreateScreenEffect(query)

  return query
}
