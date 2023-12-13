/**
 * Generated by orval v6.21.0 🍺
 * Do not edit manually.
 * screen-geometry-app-backend-serverless-apis-v1
 * OpenAPI spec version: 1.0.0
 */
import type { MutationFunction, UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import { useApiAxios } from '../../../hooks/fetch/useApiAxios'
import type { ErrorResponse, ScreenItemResponse } from '../models'

export const useShowScreenActionHook = () => {
  const showScreenAction = useApiAxios<ScreenItemResponse>()

  return (id: string) => {
    return showScreenAction({ url: `/screen/${id}/show`, method: 'PATCH' })
  }
}

export const useShowScreenActionMutationOptions = <TError = ErrorResponse, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<ReturnType<typeof useShowScreenActionHook>>>,
    TError,
    { id: string },
    TContext
  >
}): UseMutationOptions<
  Awaited<ReturnType<ReturnType<typeof useShowScreenActionHook>>>,
  TError,
  { id: string },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {}

  const showScreenAction = useShowScreenActionHook()

  const mutationFn: MutationFunction<
    Awaited<ReturnType<ReturnType<typeof useShowScreenActionHook>>>,
    { id: string }
  > = (props) => {
    const { id } = props ?? {}

    return showScreenAction(id)
  }

  return { mutationFn, ...mutationOptions }
}

export type ShowScreenActionMutationResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof useShowScreenActionHook>>>
>

export type ShowScreenActionMutationError = ErrorResponse

export const useShowScreenAction = <TError = ErrorResponse, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<ReturnType<typeof useShowScreenActionHook>>>,
    TError,
    { id: string },
    TContext
  >
}) => {
  const mutationOptions = useShowScreenActionMutationOptions(options)

  return useMutation(mutationOptions)
}
