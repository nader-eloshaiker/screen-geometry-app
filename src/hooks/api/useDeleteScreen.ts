import { useEffect } from 'react'
import { ErrorResponse } from 'react-router-dom'
import {
  GeneralNotificationItem,
  NotificationActionTypes,
  NotificationType,
} from '../../contexts/Notification/NotificationManager'
import { useNotificationContext } from '../../contexts/Notification/useNotifcationContext'
import { ScreenActionTypes } from '../../contexts/Screen/ScreenManager'
import { useScreenContext } from '../../contexts/Screen/useScreenContext'
import { ScreenIdResponse } from '../../generated/openapi/models'
import { useDeleteScreenAction } from '../../generated/openapi/services/screen-service'

type ActionParams = Parameters<typeof useDeleteScreenAction<ScreenIdResponse, ErrorResponse>>
type QueryOptions = ActionParams[0]

export const useDeleteScreen = (queryOptions?: QueryOptions) => {
  const { dispatch: dispatchScreen } = useScreenContext()
  const { dispatch: dispatchNotification } = useNotificationContext()
  const {
    isPending: isDeleteLoading,
    data: deleteResponse,
    error: deleteError,
    mutate: deleteAction,
  } = useDeleteScreenAction(queryOptions)

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
