import { useEffect } from 'react'
import { NotificationActionTypes, NotificationType } from '../../contexts/Notification/NotificationManager'
import { useNotificationContext } from '../../contexts/Notification/useNotifcationContext'
import { ScreenActionTypes } from '../../contexts/Screen/ScreenManager'
import { useScreenContext } from '../../contexts/Screen/useScreenContext'
import { useListScreensAction } from '../../generated/openapi/services/screen-list-service'

export const useListScreens = () => {
  const [_, dispatchScreen] = useScreenContext()
  const [__, dispatchNotification] = useNotificationContext()
  const { isLoading: isScreenListLoading, error: screenListError, data: screenListResponse } = useListScreensAction()

  useEffect(() => {
    if (screenListResponse && screenListResponse.list.length > 0) {
      dispatchScreen({ type: ScreenActionTypes.LIST, payload: screenListResponse.list })
    }
  }, [screenListResponse])

  useEffect(() => {
    if (screenListError) {
      dispatchNotification({
        type: NotificationActionTypes.ADD_NOTIFICATION,
        payload: { value: screenListError, type: NotificationType.ERROR },
      })
    }
  }, [screenListError])

  return { isScreenListLoading, screenListResponse, screenListError }
}
