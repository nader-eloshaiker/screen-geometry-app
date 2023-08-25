import { useEffect } from 'react'
import { AppActionTypes } from '../../contexts/App/AppManager'
import { useAppContext } from '../../contexts/App/useAppContext'
import {
  GeneralNotificationItem,
  NotificationActionTypes,
  NotificationType,
} from '../../contexts/Notification/NotificationManager'
import { useNotificationContext } from '../../contexts/Notification/useNotifcationContext'
import { useDeleteScreenAction } from '../../generated/openapi/services/screen-service'

export const useDeleteScreen = () => {
  const [_, dispatchScreen] = useAppContext()
  const [__, dispatchNotification] = useNotificationContext()
  const {
    isLoading: isDeleteLoading,
    data: deleteResponse,
    error: deleteError,
    mutate: deleteAction,
  } = useDeleteScreenAction()

  useEffect(() => {
    if (deleteResponse) {
      dispatchScreen({ type: AppActionTypes.DELETE, payload: deleteResponse.id })
      dispatchNotification({
        type: NotificationActionTypes.ADD_NOTIFICATION,
        payload: {
          value: { title: 'Success', message: 'Deleted: Screen configuration' } as GeneralNotificationItem,
          type: NotificationType.SUCCESS,
        },
      })
    }
  }, [deleteResponse])

  useEffect(() => {
    if (deleteError) {
      dispatchNotification({
        type: NotificationActionTypes.ADD_NOTIFICATION,
        payload: { value: deleteError, type: NotificationType.ERROR },
      })
    }
  }, [deleteError])

  return { isDeleteLoading, deleteResponse, deleteError, deleteAction }
}
