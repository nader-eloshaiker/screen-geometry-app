import { keepPreviousData } from '@tanstack/react-query'
import { ScreenItemResponse } from '../../generated/openapi/models'
import { useGetScreenAction } from '../../generated/openapi/services/screen-service'
import { useApiQuery } from '../fetch/useApiQuery'

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
