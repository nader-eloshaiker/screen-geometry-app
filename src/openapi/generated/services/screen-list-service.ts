/**
 * Generated by orval 🍺
 * Do not edit manually.
 * screen-geometry-app-backend-serverless-apis-v1
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
import { HttpResponse, delay, http } from 'msw'
import { useApiAxios } from '../../../hooks/api/useApiAxios'
import type { ErrorResponse, ScreenInputList, ScreenListResponse } from '../models'

export const useGetScreenListHook = () => {
  const getScreenList = useApiAxios<ScreenListResponse>()

  return (signal?: AbortSignal) => {
    return getScreenList({ url: `/screens`, method: 'GET', signal })
  }
}

export const getGetScreenListQueryKey = () => {
  return [`/screens`] as const
}

export const useGetScreenListQueryOptions = <
  TData = Awaited<ReturnType<ReturnType<typeof useGetScreenListHook>>>,
  TError = ErrorResponse,
>(options?: {
  query?: Partial<UseQueryOptions<Awaited<ReturnType<ReturnType<typeof useGetScreenListHook>>>, TError, TData>>
}) => {
  const { query: queryOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getGetScreenListQueryKey()

  const getScreenList = useGetScreenListHook()

  const queryFn: QueryFunction<Awaited<ReturnType<ReturnType<typeof useGetScreenListHook>>>> = ({ signal }) =>
    getScreenList(signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<ReturnType<typeof useGetScreenListHook>>>,
    TError,
    TData
  > & { queryKey: QueryKey }
}

export type GetScreenListQueryResult = NonNullable<Awaited<ReturnType<ReturnType<typeof useGetScreenListHook>>>>
export type GetScreenListQueryError = ErrorResponse

export const useGetScreenList = <
  TData = Awaited<ReturnType<ReturnType<typeof useGetScreenListHook>>>,
  TError = ErrorResponse,
>(options?: {
  query?: Partial<UseQueryOptions<Awaited<ReturnType<ReturnType<typeof useGetScreenListHook>>>, TError, TData>>
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = useGetScreenListQueryOptions(options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

  query.queryKey = queryOptions.queryKey

  return query
}

export const useCreateScreenListHook = () => {
  const createScreenList = useApiAxios<ScreenListResponse>()

  return (screenInputList: ScreenInputList) => {
    return createScreenList({
      url: `/screens`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: screenInputList,
    })
  }
}

export const useCreateScreenListMutationOptions = <TError = ErrorResponse, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<ReturnType<typeof useCreateScreenListHook>>>,
    TError,
    { data: ScreenInputList },
    TContext
  >
}): UseMutationOptions<
  Awaited<ReturnType<ReturnType<typeof useCreateScreenListHook>>>,
  TError,
  { data: ScreenInputList },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {}

  const createScreenList = useCreateScreenListHook()

  const mutationFn: MutationFunction<
    Awaited<ReturnType<ReturnType<typeof useCreateScreenListHook>>>,
    { data: ScreenInputList }
  > = (props) => {
    const { data } = props ?? {}

    return createScreenList(data)
  }

  return { mutationFn, ...mutationOptions }
}

export type CreateScreenListMutationResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof useCreateScreenListHook>>>
>
export type CreateScreenListMutationBody = ScreenInputList
export type CreateScreenListMutationError = ErrorResponse

export const useCreateScreenList = <TError = ErrorResponse, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<ReturnType<typeof useCreateScreenListHook>>>,
    TError,
    { data: ScreenInputList },
    TContext
  >
}) => {
  const mutationOptions = useCreateScreenListMutationOptions(options)

  return useMutation(mutationOptions)
}

export const getGetScreenListMock = () => ({
  list: [
    {
      id: 'pVesw1Iu',
      tag: { diagonalSize: 34, aspectRatio: '21:9' },
      data: { hSize: 31.25093102061397, vSize: 13.3932561516917, hAspectRatio: 21, vAspectRatio: 9 },
      spec: { hRes: 3440, vRes: 1440, ppi: 109.68340725465096 },
      color: { lightColor: '#FCDF50', darkColor: '#967E03' },
      visible: true,
    },
    {
      id: 'wbXsutUI',
      tag: { diagonalSize: 38, aspectRatio: '21:9' },
      data: { hSize: 34.9275111406862, vSize: 14.968933346008372, hAspectRatio: 21, vAspectRatio: 9 },
      spec: { hRes: 3840, vRes: 1600, ppi: 109.47368421052632 },
      color: { lightColor: '#F6693C', darkColor: '#C33609' },
      visible: true,
    },
    {
      id: 'LnAg4nPQ',
      tag: { diagonalSize: 27, aspectRatio: '16:9' },
      data: { hSize: 23.53253950236283, vSize: 13.237053470079092, hAspectRatio: 16, vAspectRatio: 9 },
      spec: { hRes: 3840, vRes: 2160, ppi: 163.17830889498507 },
      color: { lightColor: '#67E5AA', darkColor: '#168350' },
      visible: true,
    },
    {
      id: 'oxrH4rCU',
      tag: { diagonalSize: 49, aspectRatio: '32:9' },
      data: { hSize: 47.169896067541046, vSize: 13.26653326899592, hAspectRatio: 32, vAspectRatio: 9 },
      spec: { hRes: 5120, vRes: 1440, ppi: 108.54380498674065 },
      color: { lightColor: '#64E8DD', darkColor: '#14857B' },
      visible: true,
    },
  ],
})

export const getCreateScreenListMock = () => ({
  list: [
    {
      id: 'pVesw1Iu',
      tag: { diagonalSize: 34, aspectRatio: '21:9' },
      data: { hSize: 31.25093102061397, vSize: 13.3932561516917, hAspectRatio: 21, vAspectRatio: 9 },
      spec: { hRes: 3440, vRes: 1440, ppi: 109.68340725465096 },
      color: { lightColor: '#FCDF50', darkColor: '#967E03' },
      visible: true,
    },
    {
      id: 'wbXsutUI',
      tag: { diagonalSize: 38, aspectRatio: '21:9' },
      data: { hSize: 34.9275111406862, vSize: 14.968933346008372, hAspectRatio: 21, vAspectRatio: 9 },
      spec: { hRes: 3840, vRes: 1600, ppi: 109.47368421052632 },
      color: { lightColor: '#F6693C', darkColor: '#C33609' },
      visible: true,
    },
    {
      id: 'LnAg4nPQ',
      tag: { diagonalSize: 27, aspectRatio: '16:9' },
      data: { hSize: 23.53253950236283, vSize: 13.237053470079092, hAspectRatio: 16, vAspectRatio: 9 },
      spec: { hRes: 3840, vRes: 2160, ppi: 163.17830889498507 },
      color: { lightColor: '#67E5AA', darkColor: '#168350' },
      visible: true,
    },
    {
      id: 'oxrH4rCU',
      tag: { diagonalSize: 49, aspectRatio: '32:9' },
      data: { hSize: 47.169896067541046, vSize: 13.26653326899592, hAspectRatio: 32, vAspectRatio: 9 },
      spec: { hRes: 5120, vRes: 1440, ppi: 108.54380498674065 },
      color: { lightColor: '#64E8DD', darkColor: '#14857B' },
      visible: true,
    },
  ],
})

export const getScreenListServiceMock = () => [
  http.get('*/screens', async () => {
    await delay(10)
    return new HttpResponse(JSON.stringify(getGetScreenListMock()), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }),
  http.post('*/screens', async () => {
    await delay(10)
    return new HttpResponse(JSON.stringify(getCreateScreenListMock()), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }),
]
