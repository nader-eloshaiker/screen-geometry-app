import { ScreenItemResponse } from '@openapi/models'
import { useGetScreenAction } from '@openapi/services/screen-service'
import { keepPreviousData } from '@tanstack/react-query'
import { useApiQuery } from '../useApiQuery'

export const useGetScreen = (id: string, enabled: boolean) => {
  const useApiRequest = () =>
    useGetScreenAction(id, {
      query: {
        queryKey: ['useFindScreen'],
        enabled,
        placeholderData: keepPreviousData,
      },
    })

  return useApiQuery<ScreenItemResponse>({
    useApiRequest,
  })
}
