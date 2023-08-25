import { useEffect } from 'react'
import { AppActionTypes } from '../../contexts/App/AppManager'
import { useAppContext } from '../../contexts/App/useAppContext'
import {
  GeneralNotificationItem,
  NotificationActionTypes,
  NotificationType,
} from '../../contexts/Notification/NotificationManager'
import { useNotificationContext } from '../../contexts/Notification/useNotifcationContext'
import { useFavoriteScreenAction } from '../../generated/openapi/services/screen-action-service'

export const useFavoriteScreen = () => {
  const [_, dispatchScreen] = useAppContext()
  const [__, dispatchNotification] = useNotificationContext()
  const {
    isLoading: isFavoriteLoading,
    data: favoriteResponse,
    error: favouriteError,
    mutate: favoriteAction,
  } = useFavoriteScreenAction()

  useEffect(() => {
    if (favoriteResponse) {
      dispatchScreen({ type: AppActionTypes.UPDATE, payload: favoriteResponse.item })
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
