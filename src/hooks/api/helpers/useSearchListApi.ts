import { ErrorResponse, GetSearchListParams, SearchListResponse } from '@openapi/generated/models'
import { useGetSearchList } from '@openapi/generated/services/search-list-service'
import { keepPreviousData } from '@tanstack/react-query'
import { useApiEffectHandler } from '../useApiEffectHandler'

export const useSearchListApi = (params: GetSearchListParams) => {
  const request = useGetSearchList<SearchListResponse, ErrorResponse>(params, {
    query: { queryKey: ['useGetSearchList', ...Object.values(params)], placeholderData: keepPreviousData },
  })

  useApiEffectHandler<SearchListResponse>({
    data: request.data,
    error: request.error,
  })

  return request
}
