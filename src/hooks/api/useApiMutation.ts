import type { UseMutationResult } from '@tanstack/react-query'
import { useEffect } from 'react'
import {
  GeneralNotificationItem,
  NotificationActionTypes,
  NotificationType,
} from '../../contexts/Notification/NotificationManager'
import { useNotificationContext } from '../../contexts/Notification/useNotifcationContext'
import { ErrorResponse } from '../../generated/openapi/models'

export const useApiMutation = <TData, TVariables, TError = ErrorResponse, TContext = unknown>({
  useApiRequest,
  apiCallback,
  success,
}: {
  useApiRequest(): UseMutationResult<TData, TError, TVariables, TContext>
  apiCallback?(data: TData | undefined): void
  success?: { title: string; message: string }
}) => {
  const { dispatch } = useNotificationContext()
  const { isPending, error, data, mutate: useMutation } = useApiRequest()

  useEffect(() => {
    if (!apiCallback || !data) {
      return
    }
    apiCallback(data)

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
  }, [apiCallback, data, dispatch, success])

  useEffect(() => {
    if (error) {
      dispatch({
        type: NotificationActionTypes.ADD_NOTIFICATION,
        payload: { value: error, type: NotificationType.ERROR },
      })
    }
  }, [dispatch, error])

  return { isPending, data, error, useMutation }
}
