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
import { ErrorResponse, ScreenInput } from '../../generated/openapi/models'
import { useUpdateScreenAction, useUpdateScreenActionHook } from '../../generated/openapi/services/screen-service'

export type UpdateScreenOptions = UseMutationOptions<
  Awaited<ReturnType<ReturnType<typeof useUpdateScreenActionHook>>>,
  ErrorResponse,
  { id: string; data: ScreenInput }
>

export const useUpdateScreen = (queryOptions?: UpdateScreenOptions) => {
  const { dispatch: dispatchScreen } = useScreenContext()
  const { dispatch: dispatchNotification } = useNotificationContext()
  const {
    isPending: isUpdateLoading,
    data: updateResponse,
    error: updateError,
    mutate: updateAction,
  } = useUpdateScreenAction({ mutation: queryOptions })

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

  return { isUpdateLoading, updateResponse, updateError, updateAction }
}
