import { GetSearchParams, SearchListResponse, useGetSearch } from '@/lib/openapi/generated'
import { keepPreviousData } from '@tanstack/react-query'
import { useApiEffectHandler } from '../useApiEffectHandler'

export const useSearchApi = (params?: GetSearchParams) => {
  const request = useGetSearch<SearchListResponse>(params, {
    query: {
      staleTime: Infinity,
      placeholderData: keepPreviousData,
    },
  })

  useApiEffectHandler<SearchListResponse>({
    data: request.data,
    error: request.error,
  })

  return request
}
