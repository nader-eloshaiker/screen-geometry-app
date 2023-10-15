import { useEffect } from 'react'
import {
  GeneralNotificationItem,
  NotificationActionTypes,
  NotificationType,
} from '../../contexts/Notification/NotificationManager'
import { useNotificationContext } from '../../contexts/Notification/useNotifcationContext'
import { ScreenActionTypes } from '../../contexts/Screen/ScreenManager'
import { useScreenContext } from '../../contexts/Screen/useScreenContext'
import { ScreenItem } from '../../generated/openapi/models'
import { useUpdateScreenAction } from '../../generated/openapi/services/screen-service'

export const useUpdateScreen = () => {
  const { dispatch: dispatchScreen } = useScreenContext()
  const { dispatch: dispatchNotification } = useNotificationContext()
  const { isLoading: isUpdateLoading, data: updateResponse, error: updateError, mutate } = useUpdateScreenAction()

  useEffect(() => {
    if (updateResponse) {
      dispatchScreen({ type: ScreenActionTypes.UPDATE, payload: updateResponse.item })
      dispatchNotification({
        type: NotificationActionTypes.ADD_NOTIFICATION,
        payload: {
          value: { title: 'Success', message: 'Updated: Screen configuration' } as GeneralNotificationItem,
          type: NotificationType.SUCCESS,
        },
      })
    }
  }, [dispatchNotification, dispatchScreen, updateResponse])

  useEffect(() => {
    if (updateError) {
      dispatchNotification({
        type: NotificationActionTypes.ADD_NOTIFICATION,
        payload: { value: updateError, type: NotificationType.ERROR },
      })
    }
  }, [dispatchNotification, updateError])

  const updateAction = (screen: ScreenItem) => mutate({ id: screen.id, data: screen })

  return { isUpdateLoading, updateResponse, updateError, updateAction }
}
