import { useUpdateScreenEffect } from '@/app/hooks/api/useUpdateScreenEffect'
import { queryClient } from '@/app/stores/query/QueryClient'
import { getGetScreenListQueryKey, getGetScreenQueryKey, useUpdateScreen } from '@screengeometry/lib-api/spec'

export const useUpdateHandler = () => {
  const query = useUpdateScreen({
    mutation: {
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: [getGetScreenListQueryKey(), getGetScreenQueryKey()] }),
    },
  })
  useUpdateScreenEffect(query)

  return query
}
