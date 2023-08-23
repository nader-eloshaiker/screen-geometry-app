import { useEffect } from 'react'
import { ActionTypes } from '../../contexts/App/AppManager'
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
      dispatch({ type: ActionTypes.UPDATE, payload: favoriteResponse.item })
    }
  }, [favoriteResponse])

  return { isFavoriteLoading, favouriteError, favoriteAction }
}
