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
import { useFavoriteScreenAction } from '../../generated/openapi/services/screen-action-service'

export type FavouriteScreenOptions = UseMutationOptions<ScreenItemResponse, ErrorResponse, { id: string }>

export const useFavoriteScreen = (queryOptions?: FavouriteScreenOptions) => {
  const { dispatch: dispatchScreen } = useScreenContext()
  const { dispatch: dispatchNotification } = useNotificationContext()
  const {
    isLoading: isFavoriteLoading,
    data: favoriteResponse,
    error: favouriteError,
    mutate: favoriteAction,
  } = useFavoriteScreenAction({ mutation: queryOptions })

  useEffect(() => {
    if (favoriteResponse) {
      dispatchScreen({ type: ScreenActionTypes.UPDATE, payload: favoriteResponse.item })
      dispatchNotification({
        type: NotificationActionTypes.ADD_NOTIFICATION,
        payload: {
          value: {
            title: 'Success',
            message: `${favoriteResponse.item.favorite ? 'Favorited' : 'Unfavorited'}: Screen configuration`,
          } as GeneralNotificationItem,
          type: NotificationType.SUCCESS,
        },
      })
    }
  }, [dispatchNotification, dispatchScreen, favoriteResponse])

  useEffect(() => {
    if (favouriteError) {
      dispatchNotification({
        type: NotificationActionTypes.ADD_NOTIFICATION,
        payload: { value: favouriteError, type: NotificationType.ERROR },
      })
    }
  }, [dispatchNotification, favouriteError])

  return { isFavoriteLoading, favoriteResponse, favouriteError, favoriteAction }
}
