/**
 * Generated by orval 🍺
 * Do not edit manually.
 * screen-geometry-app-backend-serverless-apis-v1
 */
import type { QueryFunction, QueryKey, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import { useApiAxios } from '../../../hooks/api/useApiAxios'
import type { ErrorResponse, GetSearchListParams, SearchListResponse } from '../models'

export const useGetSearchListHook = () => {
  const getSearchList = useApiAxios<SearchListResponse>()

  return (params?: GetSearchListParams, signal?: AbortSignal) => {
    return getSearchList({ url: `/search`, method: 'GET', params, signal })
  }
}

export const getGetSearchListQueryKey = (params?: GetSearchListParams) => {
  return [`/search`, ...(params ? [params] : [])] as const
}

export const useGetSearchListQueryOptions = <
  TData = Awaited<ReturnType<ReturnType<typeof useGetSearchListHook>>>,
  TError = ErrorResponse,
>(
  params?: GetSearchListParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<ReturnType<typeof useGetSearchListHook>>>, TError, TData>>
  },
) => {
  const { query: queryOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getGetSearchListQueryKey(params)

  const getSearchList = useGetSearchListHook()

  const queryFn: QueryFunction<Awaited<ReturnType<ReturnType<typeof useGetSearchListHook>>>> = ({ signal }) =>
    getSearchList(params, signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<ReturnType<typeof useGetSearchListHook>>>,
    TError,
    TData
  > & { queryKey: QueryKey }
}

export type GetSearchListQueryResult = NonNullable<Awaited<ReturnType<ReturnType<typeof useGetSearchListHook>>>>
export type GetSearchListQueryError = ErrorResponse

export const useGetSearchList = <
  TData = Awaited<ReturnType<ReturnType<typeof useGetSearchListHook>>>,
  TError = ErrorResponse,
>(
  params?: GetSearchListParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<ReturnType<typeof useGetSearchListHook>>>, TError, TData>>
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = useGetSearchListQueryOptions(params, options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

  query.queryKey = queryOptions.queryKey

  return query
}
