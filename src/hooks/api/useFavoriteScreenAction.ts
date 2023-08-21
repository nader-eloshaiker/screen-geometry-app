import { useEffect } from 'react'
import { routes } from '../../api/ApiRouteSchema'
import { TScreenResponse } from '../../api/db/indexApi'
import { ActionTypes } from '../../contexts/App/AppManager'
import { useAppContext } from '../../contexts/App/useAppContext'
import useAxios from '../useAxios'

export const useFavoriteScreenAction = () => {
  const [_, dispatch] = useAppContext()
  const { loading, response, error, execute } = useAxios<{ payload: TScreenResponse }>({
    options: { manualExecution: true },
  })

  const executeFavorite = (id: string) => {
    execute({
      url: `${routes.baseUrl}${routes.root}/${routes.screens.path}/${id}/${routes.screens.actions.favorite}`,
      method: 'PATCH',
    })
  }

  useEffect(() => {
    if (response && !loading && !error) {
      dispatch({ type: ActionTypes.UPDATE, payload: response.data.payload.item })
    }

    dispatch({ type: ActionTypes.LOADING, payload: { status: !!loading, tag: 'FavoriteScreenAction' } })
  }, [loading, response, error])

  return { loading, response, error, executeFavorite }
}
