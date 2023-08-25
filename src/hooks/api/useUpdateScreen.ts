import { useEffect } from 'react'
import { AppActionTypes } from '../../contexts/App/AppManager'
import { useAppContext } from '../../contexts/App/useAppContext'
import {
  GeneralNotificationItem,
  NotificationActionTypes,
  NotificationType,
} from '../../contexts/Notification/NotificationManager'
import { useNotificationContext } from '../../contexts/Notification/useNotifcationContext'
import { ScreenItem } from '../../generated/openapi/models'
import { useUpdateScreenAction } from '../../generated/openapi/services/screen-service'

export const useUpdateScreen = () => {
  const [_, dispatchScreen] = useAppContext()
  const [__, dispatchNotification] = useNotificationContext()
  const { isLoading: isUpdateLoading, data: updateResponse, error: updateError, mutate } = useUpdateScreenAction()

  useEffect(() => {
    if (updateResponse) {
      dispatchScreen({ type: AppActionTypes.UPDATE, payload: updateResponse.item })
      dispatchNotification({
        type: NotificationActionTypes.ADD_NOTIFICATION,
        payload: {
          value: { title: 'Success', message: 'Updated: Screen configuration' } as GeneralNotificationItem,
          type: NotificationType.SUCCESS,
        },
      })
    }
  }, [updateResponse])

  useEffect(() => {
    if (updateError) {
      dispatchNotification({
        type: NotificationActionTypes.ADD_NOTIFICATION,
        payload: { value: updateError, type: NotificationType.ERROR },
      })
    }
  }, [updateError])

  const updateAction = (screen: ScreenItem) => mutate({ id: screen.id, data: screen })

  return { isUpdateLoading, updateResponse, updateError, updateAction }
}
