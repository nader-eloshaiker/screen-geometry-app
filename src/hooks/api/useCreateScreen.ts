import { UseMutationOptions } from '@tanstack/react-query'
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

export type CreateScreenOptions = UseMutationOptions<ScreenItemResponse, ErrorResponse, { data: ScreenInput }>

export const useCreateScreen = (queryOptions?: CreateScreenOptions) => {
  const { dispatch: dispatchScreen } = useScreenContext()
  const { dispatch: dispatchNotification } = useNotificationContext()
  const {
    isLoading: isCreateLoading,
    data: createResponse,
    error: createError,
    mutate,
  } = useCreateScreenAction({ mutation: queryOptions })

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
