import { ScreenItemResponse } from '@openapi/generated/models'
import { useGetScreen } from '@openapi/generated/services/screen-service'
import { keepPreviousData } from '@tanstack/react-query'
import { useApiQuery } from '../useApiQuery'

export const useGetScreenApi = (id: string, enabled: boolean) => {
  const useApiRequest = () =>
    useGetScreen(id, {
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
