import { useEffect } from 'react'
import {
  GeneralNotificationItem,
  NotificationActionTypes,
  NotificationType,
} from '../../contexts/Notification/NotificationManager'
import { useNotificationContext } from '../../contexts/Notification/useNotifcationContext'
import { ScreenActionTypes } from '../../contexts/Screen/ScreenManager'
import { useScreenContext } from '../../contexts/Screen/useScreenContext'
import { useFavoriteScreenAction } from '../../generated/openapi/services/screen-action-service'

export const useFavoriteScreen = () => {
  const [_, dispatchScreen] = useScreenContext()
  const [__, dispatchNotification] = useNotificationContext()
  const {
    isLoading: isFavoriteLoading,
    data: favoriteResponse,
    error: favouriteError,
    mutate: favoriteAction,
  } = useFavoriteScreenAction()

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
  }, [favoriteResponse])

  useEffect(() => {
    if (favouriteError) {
      dispatchNotification({
        type: NotificationActionTypes.ADD_NOTIFICATION,
        payload: { value: favouriteError, type: NotificationType.ERROR },
      })
    }
  }, [favouriteError])

  return { isFavoriteLoading, favoriteResponse, favouriteError, favoriteAction }
}
