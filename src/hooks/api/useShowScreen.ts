import { UseMutationOptions } from '@tanstack/react-query'
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
import { ScreenItemResponse } from '../../generated/openapi/models'
import { useShowScreenAction } from '../../generated/openapi/services/screen-action-service'

export type ShowScreenOptions = UseMutationOptions<ScreenItemResponse, ErrorResponse, { id: string }>

export const useShowScreen = (queryOptions?: ShowScreenOptions) => {
  const { dispatch: dispatchScreen } = useScreenContext()
  const { dispatch: dispatchNotification } = useNotificationContext()
  const {
    isLoading: isVisibleLoading,
    data: visibleResponse,
    error: visibleError,
    mutate: visibleAction,
  } = useShowScreenAction({ mutation: queryOptions })

  useEffect(() => {
    if (visibleResponse) {
      dispatchScreen({ type: ScreenActionTypes.UPDATE, payload: visibleResponse.item })
      dispatchNotification({
        type: NotificationActionTypes.ADD_NOTIFICATION,
        payload: {
          value: {
            title: 'Success',
            message: `${visibleResponse.item.visible ? 'Shown' : 'Hidden'}: Screen configuration`,
          } as GeneralNotificationItem,
          type: NotificationType.SUCCESS,
        },
      })
    }
  }, [dispatchNotification, dispatchScreen, visibleResponse])

  useEffect(() => {
    if (visibleError) {
      dispatchNotification({
        type: NotificationActionTypes.ADD_NOTIFICATION,
        payload: { value: visibleError, type: NotificationType.ERROR },
      })
    }
  }, [dispatchNotification, visibleError])

  return {
    isVisibleLoading,
    visibleResponse,
    visibleError,
    visibleAction,
  }
}
