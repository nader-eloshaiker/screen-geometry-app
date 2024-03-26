import { GetSearchParams, SearchListResponse, useGetSearch } from '@openapi/generated'
import { keepPreviousData } from '@tanstack/react-query'
import { useApiEffectHandler } from '../useApiEffectHandler'

export const useSearchApi = (params?: GetSearchParams) => {
  const request = useGetSearch<SearchListResponse>(params, {
    query: { queryKey: ['useGetSearchList', ...Object.values(params ?? {})], placeholderData: keepPreviousData },
  })

  useApiEffectHandler<SearchListResponse>({
    data: request.data,
    error: request.error,
  })

  return request
}
