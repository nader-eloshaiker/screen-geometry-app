import { ErrorResponse, ScreenItemResponse } from '@openapi/generated/models'
import { useGetScreen } from '@openapi/generated/services/screen-service'
import { keepPreviousData } from '@tanstack/react-query'
import { useApiEffectHandler } from '../useApiEffectHandler'

// type TQuery = typeof useGetScreen<ScreenItemResponse, ErrorResponse>
// type TQueryParams = Parameters<TQuery>

export const useGetScreenApi = (params: string, enabled: boolean) => {
  const request = useGetScreen<ScreenItemResponse, ErrorResponse>(params, {
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
