/**
 * Generated by orval v6.21.0 🍺
 * Do not edit manually.
 * screen-geometry-app-backend-serverless-apis-v1
 * OpenAPI spec version: 1.0.0
 */
import type {
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useApiAxios } from '../../../hooks/api/useApiAxios'
import type { ErrorResponse, ScreenInput, ScreenInputList, ScreenItemResponse, ScreenListResponse } from '../models'

export const useListScreensActionHook = () => {
  const listScreensAction = useApiAxios<ScreenListResponse>()

  return (signal?: AbortSignal) => {
    return listScreensAction({ url: `/screens`, method: 'GET', signal })
  }
}

export const getListScreensActionQueryKey = () => {
  return [`/screens`] as const
}

export const useListScreensActionQueryOptions = <
  TData = Awaited<ReturnType<ReturnType<typeof useListScreensActionHook>>>,
  TError = ErrorResponse,
>(options?: {
  query?: Partial<UseQueryOptions<Awaited<ReturnType<ReturnType<typeof useListScreensActionHook>>>, TError, TData>>
}) => {
  const { query: queryOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getListScreensActionQueryKey()

  const listScreensAction = useListScreensActionHook()

  const queryFn: QueryFunction<Awaited<ReturnType<ReturnType<typeof useListScreensActionHook>>>> = ({ signal }) =>
    listScreensAction(signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<ReturnType<typeof useListScreensActionHook>>>,
    TError,
    TData
  > & { queryKey: QueryKey }
}

export type ListScreensActionQueryResult = NonNullable<Awaited<ReturnType<ReturnType<typeof useListScreensActionHook>>>>
export type ListScreensActionQueryError = ErrorResponse

export const useListScreensAction = <
  TData = Awaited<ReturnType<ReturnType<typeof useListScreensActionHook>>>,
  TError = ErrorResponse,
>(options?: {
  query?: Partial<UseQueryOptions<Awaited<ReturnType<ReturnType<typeof useListScreensActionHook>>>, TError, TData>>
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = useListScreensActionQueryOptions(options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

  query.queryKey = queryOptions.queryKey

  return query
}

export const useCreateScreenListActionHook = () => {
  const createScreenListAction = useApiAxios<ScreenListResponse>()

  return (screenInputList: ScreenInputList) => {
    return createScreenListAction({
      url: `/screens`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: screenInputList,
    })
  }
}

export const useCreateScreenListActionMutationOptions = <TError = ErrorResponse, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<ReturnType<typeof useCreateScreenListActionHook>>>,
    TError,
    { data: ScreenInputList },
    TContext
  >
}): UseMutationOptions<
  Awaited<ReturnType<ReturnType<typeof useCreateScreenListActionHook>>>,
  TError,
  { data: ScreenInputList },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {}

  const createScreenListAction = useCreateScreenListActionHook()

  const mutationFn: MutationFunction<
    Awaited<ReturnType<ReturnType<typeof useCreateScreenListActionHook>>>,
    { data: ScreenInputList }
  > = (props) => {
    const { data } = props ?? {}

    return createScreenListAction(data)
  }

  return { mutationFn, ...mutationOptions }
}

export type CreateScreenListActionMutationResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof useCreateScreenListActionHook>>>
>
export type CreateScreenListActionMutationBody = ScreenInputList
export type CreateScreenListActionMutationError = ErrorResponse

export const useCreateScreenListAction = <TError = ErrorResponse, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<ReturnType<typeof useCreateScreenListActionHook>>>,
    TError,
    { data: ScreenInputList },
    TContext
  >
}) => {
  const mutationOptions = useCreateScreenListActionMutationOptions(options)

  return useMutation(mutationOptions)
}
export const useCreateScreenActionHook = () => {
  const createScreenAction = useApiAxios<ScreenItemResponse>()

  return (screenInput: ScreenInput) => {
    return createScreenAction({
      url: `/screen`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: screenInput,
    })
  }
}

export const useCreateScreenActionMutationOptions = <TError = ErrorResponse, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<ReturnType<typeof useCreateScreenActionHook>>>,
    TError,
    { data: ScreenInput },
    TContext
  >
}): UseMutationOptions<
  Awaited<ReturnType<ReturnType<typeof useCreateScreenActionHook>>>,
  TError,
  { data: ScreenInput },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {}

  const createScreenAction = useCreateScreenActionHook()

  const mutationFn: MutationFunction<
    Awaited<ReturnType<ReturnType<typeof useCreateScreenActionHook>>>,
    { data: ScreenInput }
  > = (props) => {
    const { data } = props ?? {}

    return createScreenAction(data)
  }

  return { mutationFn, ...mutationOptions }
}

export type CreateScreenActionMutationResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof useCreateScreenActionHook>>>
>
export type CreateScreenActionMutationBody = ScreenInput
export type CreateScreenActionMutationError = ErrorResponse

export const useCreateScreenAction = <TError = ErrorResponse, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<ReturnType<typeof useCreateScreenActionHook>>>,
    TError,
    { data: ScreenInput },
    TContext
  >
}) => {
  const mutationOptions = useCreateScreenActionMutationOptions(options)

  return useMutation(mutationOptions)
}