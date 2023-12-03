import { useEffect } from 'react'
import {
  GeneralNotificationItem,
  NotificationActionTypes,
  NotificationType,
} from '../../contexts/Notification/NotificationManager'
import { useNotificationContext } from '../../contexts/Notification/useNotifcationContext'
import { ScreenActionTypes } from '../../contexts/Screen/ScreenManager'
import { useScreenContext } from '../../contexts/Screen/useScreenContext'
import { ErrorResponse, ScreenInput, ScreenItemResponse } from '../../generated/openapi/models'
import { useCreateScreenAction } from '../../generated/openapi/services/screen-list-service'

type ActionParams = Parameters<typeof useCreateScreenAction<ScreenItemResponse, ErrorResponse>>
type QueryOptions = ActionParams[0]

export const useCreateScreen = (queryOptions?: QueryOptions) => {
  const { dispatch: dispatchScreen } = useScreenContext()
  const { dispatch: dispatchNotification } = useNotificationContext()
  const {
    isPending: isCreateLoading,
    data: createResponse,
    error: createError,
    mutate,
  } = useCreateScreenAction(queryOptions)

  useEffect(() => {
    if (createResponse) {
      dispatchScreen({ type: ScreenActionTypes.ADD, payload: createResponse.item })
      dispatchNotification({
        type: NotificationActionTypes.ADD_NOTIFICATION,
        payload: {
          value: { title: 'Success', message: 'Created: Screen configuration' } as GeneralNotificationItem,
          type: NotificationType.SUCCESS,
        },
      })
    }
  }, [createResponse, dispatchNotification, dispatchScreen])

  useEffect(() => {
    if (createError) {
      dispatchNotification({
        type: NotificationActionTypes.ADD_NOTIFICATION,
        payload: { value: createError, type: NotificationType.ERROR },
      })
    }
  }, [createError, dispatchNotification])

  const createAction = (screenInput: ScreenInput) => mutate({ data: screenInput })

  return { isCreateLoading, createResponse, createError, createAction }
}
