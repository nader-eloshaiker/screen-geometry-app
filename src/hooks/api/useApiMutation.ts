import {
  GeneralNotificationItem,
  NotificationActionTypes,
  NotificationType,
} from '@contexts/Notification/NotificationManager'
import { useNotificationContext } from '@contexts/Notification/useNotifcationContext'
import { ErrorResponse } from '@openapi/generated/models'
import type { UseMutationResult } from '@tanstack/react-query'
import { useEffect } from 'react'

export const useApiMutation = <TData, TVariables, TError = ErrorResponse, TContext = unknown>({
  useRequest,
  responseHandler,
  successNotification,
}: {
  useRequest(): UseMutationResult<TData, TError, TVariables, TContext>
  responseHandler?(data: TData | undefined): void
  successNotification?: { title: string; message: string }
}) => {
  const { dispatch } = useNotificationContext()
  const { isPending, error, data, mutate: useMutation } = useRequest()

  useEffect(() => {
    if (!responseHandler || !data) {
      return
    }
    responseHandler(data)

    if (successNotification) {
      const { title, message } = successNotification
      dispatch({
        type: NotificationActionTypes.ADD_NOTIFICATION,
        payload: {
          value: { title, message } as GeneralNotificationItem,
          type: NotificationType.SUCCESS,
        },
      })
    }
  }, [responseHandler, data, dispatch, successNotification])

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
