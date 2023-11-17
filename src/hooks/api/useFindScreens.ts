import { UseQueryOptions } from '@tanstack/react-query'
import { useEffect } from 'react'
import { NotificationActionTypes, NotificationType } from '../../contexts/Notification/NotificationManager'
import { useNotificationContext } from '../../contexts/Notification/useNotifcationContext'
import { ErrorResponse, ScreenItemResponse } from '../../generated/openapi/models'
import { useFindScreenAction } from '../../generated/openapi/services/screen-service'

export type FindScreenOptions = UseQueryOptions<ScreenItemResponse, ErrorResponse>

export const useFindScreen = (id: string, queryOptions?: FindScreenOptions) => {
  const { dispatch: dispatchNotification } = useNotificationContext()
  const {
    isFetching: isScreenItemLoading,
    error: screenItemError,
    data: screenItemResponse,
  } = useFindScreenAction(id, { query: queryOptions })

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
