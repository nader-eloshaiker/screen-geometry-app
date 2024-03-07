import { ScreenItemResponse, useGetScreen } from '@screengeometry/openapi'
import { keepPreviousData } from '@tanstack/react-query'
import { useApiEffectHandler } from '../useApiEffectHandler'

// type TQuery = typeof useGetScreen<ScreenItemResponse, ErrorResponse>
// type TQueryParams = Parameters<TQuery>

export const useGetScreenApi = (params: string, enabled: boolean) => {
  const request = useGetScreen<ScreenItemResponse>(params, {
    query: {
      queryKey: ['useFindScreen'],
      enabled,
      placeholderData: keepPreviousData,
    },
  })

  useApiEffectHandler<ScreenItemResponse>({
    data: request.data,
    error: request.error,
  })

  return request
}
