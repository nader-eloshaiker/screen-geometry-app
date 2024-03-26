import {
  GeneralNotificationItem,
  NotificationActionTypes,
  NotificationType,
} from '@components/common/notification/context/NotificationManager'
import { useNotificationContext } from '@components/common/notification/context/useNotifcationContext'
import { ErrorResponse } from '@openapi/generated/models'
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
