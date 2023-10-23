import { useEffect } from 'react'
import {
  GeneralNotificationItem,
  NotificationActionTypes,
  NotificationType,
} from '../../contexts/Notification/NotificationManager'
import { useNotificationContext } from '../../contexts/Notification/useNotifcationContext'
import { ScreenActionTypes } from '../../contexts/Screen/ScreenManager'
import { useScreenContext } from '../../contexts/Screen/useScreenContext'
import { ScreenInputList } from '../../generated/openapi/models'
import { useCreateScreenListAction } from '../../generated/openapi/services/screen-list-service'

export const useCreateScreenList = () => {
  const { dispatch: dispatchScreen } = useScreenContext()
  const { dispatch: dispatchNotification } = useNotificationContext()
  const {
    isLoading: isCreateListLoading,
    data: createListResponse,
    error: createListError,
    mutate,
  } = useCreateScreenListAction()

  useEffect(() => {
    if (createListResponse) {
      dispatchScreen({ type: ScreenActionTypes.ADD_LIST, payload: createListResponse.list })
      dispatchNotification({
        type: NotificationActionTypes.ADD_NOTIFICATION,
        payload: {
          value: { title: 'Success', message: 'Created: Screen configuration' } as GeneralNotificationItem,
          type: NotificationType.SUCCESS,
        },
      })
    }
  }, [createListResponse, dispatchNotification, dispatchScreen])

  useEffect(() => {
    if (createListError) {
      dispatchNotification({
        type: NotificationActionTypes.ADD_NOTIFICATION,
        payload: { value: createListError, type: NotificationType.ERROR },
      })
    }
  }, [createListError, dispatchNotification])

  const createListAction = (screenInputList: ScreenInputList) => mutate({ data: screenInputList })

  return {
    isCreateListLoading,
    createListResponse,
    createListError,
    createListAction,
  }
}
