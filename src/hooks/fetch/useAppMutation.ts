import type { UseMutationResult } from '@tanstack/react-query'
import { useEffect } from 'react'
import {
  GeneralNotificationItem,
  NotificationActionTypes,
  NotificationType,
} from '../../contexts/Notification/NotificationManager'
import { useNotificationContext } from '../../contexts/Notification/useNotifcationContext'
import { ErrorResponse } from '../../generated/openapi/models'

export const useAppMutation = <TData, TVariables, TError = ErrorResponse, TContext = unknown>({
  useRequest,
  callback,
  success,
}: {
  useRequest(): UseMutationResult<TData, TError, TVariables, TContext>
  callback?(data: TData | undefined): void
  success?: { title: string; message: string }
}) => {
  const { dispatch } = useNotificationContext()
  const { isPending, error, data, mutate: useMutate } = useRequest()

  useEffect(() => {
    if (!callback || !data) {
      return
    }
    callback(data)

    if (success) {
      const { title, message } = success
      dispatch({
        type: NotificationActionTypes.ADD_NOTIFICATION,
        payload: {
          value: { title, message } as GeneralNotificationItem,
          type: NotificationType.SUCCESS,
        },
      })
    }
  }, [callback, data, dispatch, success])

  useEffect(() => {
    if (error) {
      dispatch({
        type: NotificationActionTypes.ADD_NOTIFICATION,
        payload: { value: error, type: NotificationType.ERROR },
      })
    }
  }, [dispatch, error])

  return { isPending, data, error, useMutate }
}
