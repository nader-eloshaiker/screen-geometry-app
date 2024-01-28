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
  const request = useRequest()

  useEffect(() => {
    if (!responseHandler || !request.data) {
      return
    }
    responseHandler(request.data)

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
  }, [responseHandler, request.data, dispatch, successNotification])

  useEffect(() => {
    if (request.error) {
      dispatch({
        type: NotificationActionTypes.ADD_NOTIFICATION,
        payload: { value: request.error, type: NotificationType.ERROR },
      })
    }
  }, [dispatch, request.error])

  return request
}
