import { useEffect } from 'react'
import {
  GeneralNotificationItem,
  NotificationActionTypes,
  NotificationType,
} from '../../contexts/Notification/NotificationManager'
import { useNotificationContext } from '../../contexts/Notification/useNotifcationContext'
import { ScreenActionTypes } from '../../contexts/Screen/ScreenManager'
import { useScreenContext } from '../../contexts/Screen/useScreenContext'
import { useDeleteScreenAction } from '../../generated/openapi/services/screen-service'

export const useDeleteScreen = () => {
  const [_, dispatchScreen] = useScreenContext()
  const [__, dispatchNotification] = useNotificationContext()
  const {
    isLoading: isDeleteLoading,
    data: deleteResponse,
    error: deleteError,
    mutate: deleteAction,
  } = useDeleteScreenAction()

  useEffect(() => {
    if (deleteResponse) {
      dispatchScreen({ type: ScreenActionTypes.DELETE, payload: deleteResponse.id })
      dispatchNotification({
        type: NotificationActionTypes.ADD_NOTIFICATION,
        payload: {
          value: { title: 'Success', message: 'Deleted: Screen configuration' } as GeneralNotificationItem,
          type: NotificationType.SUCCESS,
        },
      })
    }
  }, [deleteResponse, dispatchNotification, dispatchScreen])

  useEffect(() => {
    if (deleteError) {
      dispatchNotification({
        type: NotificationActionTypes.ADD_NOTIFICATION,
        payload: { value: deleteError, type: NotificationType.ERROR },
      })
    }
  }, [deleteError, dispatchNotification])

  return { isDeleteLoading, deleteResponse, deleteError, deleteAction }
}
