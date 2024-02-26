import { ErrorResponse, GetSearchListParams, SearchListResponse, useGetSearchList } from '@screengeometry/openapi'
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
