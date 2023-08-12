import { useEffect, useState } from 'react'
import { ActionTypes } from '../../../contexts/App/AppProvider'
import { useAppContext } from '../../../contexts/App/useAppContext'
import { routes } from '../ApiRouteSchema'
import { TScreenResponse } from '../db/indexApi'
import useAxios from '../fetch/useAxios'

export const useFavoriteScreenAction = () => {
  const [favoriteId, setFavoriteId] = useState<string>()
  const [_, dispatch] = useAppContext()
  const [{ response, loading, error }, { execute: executeFavorite }] = useAxios<{ payload: TScreenResponse }>(
    {
      url: `${routes.baseUrl}${routes.root}/${routes.screens.path}/${favoriteId}/${routes.screens.actions.favorite}`,
      method: 'PATCH',
    },
    { manualExecution: true },
  )

  useEffect(() => {
    if (response && !loading && !error) {
      dispatch({ type: ActionTypes.UPDATE, payload: response.data.payload.item })
    }

    dispatch({ type: ActionTypes.LOADING, payload: { status: loading, tag: 'useFavoriteScreenAction' } })
  }, [loading, error, response])

  return [{ favoriteId, setFavoriteId, executeFavorite }] as const
}
