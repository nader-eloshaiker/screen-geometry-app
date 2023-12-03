import { useEffect } from 'react'
import { NotificationActionTypes, NotificationType } from '../../contexts/Notification/NotificationManager'
import { useNotificationContext } from '../../contexts/Notification/useNotifcationContext'
import { ErrorResponse, ScreenItemResponse } from '../../generated/openapi/models'
import { useFindScreenAction } from '../../generated/openapi/services/screen-service'

type ActionParams = Parameters<typeof useFindScreenAction<ScreenItemResponse, ErrorResponse>>
type QueryOptions = ActionParams[1]

export const useFindScreen = (id: string, queryOptions?: QueryOptions) => {
  const { dispatch: dispatchNotification } = useNotificationContext()
  const {
    isFetching: isScreenItemLoading,
    error: screenItemError,
    data: screenItemResponse,
  } = useFindScreenAction(id, queryOptions)

  useEffect(() => {
    if (screenItemError) {
      dispatchNotification({
        type: NotificationActionTypes.ADD_NOTIFICATION,
        payload: { value: screenItemError, type: NotificationType.ERROR },
      })
    }
  }, [dispatchNotification, screenItemError])

  return { isScreenItemLoading, screenItemResponse, screenItemError }
}
