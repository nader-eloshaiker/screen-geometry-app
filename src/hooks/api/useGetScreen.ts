import { keepPreviousData } from '@tanstack/react-query'
import { ScreenItemResponse } from '../../generated/openapi/models'
import { useGetScreenAction } from '../../generated/openapi/services/screen-service'
import { useAppQuery } from '../fetch/useAppQuery'

export const useGetScreen = (id: string, enabled: boolean) => {
  const useRequest = () =>
    useGetScreenAction(id, {
      query: {
        queryKey: ['useFindScreen'],
        enabled,
        placeholderData: keepPreviousData,
      },
    })

  return useAppQuery<ScreenItemResponse>({
    useRequest,
  })
}
