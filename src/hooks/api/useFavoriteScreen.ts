import { useEffect } from 'react'
import { AppActionTypes } from '../../contexts/App/AppManager'
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
    }
  }, [favoriteResponse])

  useEffect(() => {
    if (favouriteError) {
      dispatch({ type: AppActionTypes.ADD_ERROR, payload: { error: favouriteError.error, tag: 'favorite' } })
    }
  }, [favouriteError])

  return { isFavoriteLoading, favoriteResponse, favouriteError, favoriteAction }
}
