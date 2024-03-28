import { ErrorResponse } from '@packages/openapi/generated'
import {
  GeneralNotificationItem,
  NotificationActionTypes,
  NotificationType,
  useNotificationContext,
} from '@packages/ui/notification'
import { useEffect } from 'react'

export const useApiEffectHandler = <TData>({
  data,
  error,
  responseHandler,
  successNotification,
}: {
  data?: TData
  error?: ErrorResponse | null
  responseHandler?(data: TData | undefined): void
  successNotification?: { title: string; message: string }
}) => {
  const { dispatch } = useNotificationContext()

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
}
