import { GetSearchListParams, SearchListResponse } from '@openapi/generated/models'
import { useGetSearchList } from '@openapi/generated/services/search-list-service'
import { keepPreviousData } from '@tanstack/react-query'
import { useApiQuery } from '../useApiQuery'

// type ActionParams = Parameters<typeof useSearchList<SearchListResponse>, ErrorResponse>>
// type QueryOptions = ActionParams[0]

export const useSearchListApi = (params: GetSearchListParams) => {
  const useRequest = () =>
    useGetSearchList(params, {
      query: { queryKey: ['useGetSearchList', ...Object.values(params)], placeholderData: keepPreviousData },
    })

  return useApiQuery<SearchListResponse>({
    useRequest,
  })
}
