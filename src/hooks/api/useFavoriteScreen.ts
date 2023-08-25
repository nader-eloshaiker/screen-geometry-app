import { useEffect } from 'react'
import { AppActionTypes, GeneralNotificationItem, NotificationType } from '../../contexts/App/AppManager'
import { useAppContext } from '../../contexts/App/useAppContext'
import { useFavoriteScreenAction } from '../../generated/openapi/services/screen-action-service'

export const useFavoriteScreen = () => {
  const [_, dispatch] = useAppContext()
  const {
    isLoading: isFavoriteLoading,
    data: favoriteResponse,
    error: favouriteError,
    mutate: favoriteAction,
  } = useFavoriteScreenAction()

  useEffect(() => {
    if (favoriteResponse) {
      dispatch({ type: AppActionTypes.UPDATE, payload: favoriteResponse.item })
      dispatch({
        type: AppActionTypes.ADD_NOTIFICATION,
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
      dispatch({
        type: AppActionTypes.ADD_NOTIFICATION,
        payload: { value: favouriteError, type: NotificationType.ERROR },
      })
    }
  }, [favouriteError])

  return { isFavoriteLoading, favoriteResponse, favouriteError, favoriteAction }
}
