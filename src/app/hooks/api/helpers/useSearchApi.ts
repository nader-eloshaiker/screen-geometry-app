import { GetSearchParams, SearchListResponse, useGetSearch } from '@packages/openapi/generated'
import { keepPreviousData } from '@tanstack/react-query'
import { useApiEffectHandler } from '../useApiEffectHandler'

export const useSearchApi = (params?: GetSearchParams, options?: Parameters<typeof useGetSearch>[1]) => {
  const request = useGetSearch<SearchListResponse>(params, {
    ...options,
    query: {
      queryKey: ['useGetSearchList', ...Object.values(params ?? {})],
      placeholderData: keepPreviousData,
    },
  })

  useApiEffectHandler<SearchListResponse>({
    data: request.data,
    error: request.error,
  })

  return request
}
