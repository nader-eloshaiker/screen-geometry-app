import { useEffect } from 'react'
import { AppActionTypes } from '../../contexts/App/AppManager'
import { useAppContext } from '../../contexts/App/useAppContext'
import {
  GeneralNotificationItem,
  NotificationActionTypes,
  NotificationType,
} from '../../contexts/Notification/NotificationManager'
import { useNotificationContext } from '../../contexts/Notification/useNotifcationContext'
import { ScreenInput } from '../../generated/openapi/models'
import { useCreateScreenAction } from '../../generated/openapi/services/screen-list-service'

export const useCreateScreen = () => {
  const [_, dispatchScreen] = useAppContext()
  const [__, dispatchNotification] = useNotificationContext()
  const { isLoading: isCreateLoading, data: createResponse, error: createError, mutate } = useCreateScreenAction()

  useEffect(() => {
    if (createResponse) {
      dispatchScreen({ type: AppActionTypes.ADD, payload: createResponse.item })
      dispatchNotification({
        type: NotificationActionTypes.ADD_NOTIFICATION,
        payload: {
          value: { title: 'Success', message: 'Created: Screen configuration' } as GeneralNotificationItem,
          type: NotificationType.SUCCESS,
        },
      })
    }
  }, [createResponse])

  useEffect(() => {
    if (createError) {
      dispatchNotification({
        type: NotificationActionTypes.ADD_NOTIFICATION,
        payload: { value: createError, type: NotificationType.ERROR },
      })
    }
  }, [createError])

  const createAction = (screenInput: ScreenInput) => mutate({ data: screenInput })

  return { isCreateLoading, createResponse, createError, createAction }
}
