import { useEffect } from 'react'
import { routes } from '../../api/ApiRouteSchema'
import { TScreenListResponse } from '../../api/db/indexApi'
import { ActionTypes } from '../../contexts/App/AppManager'
import { useAppContext } from '../../contexts/App/useAppContext'
import useAxios from '../useAxios'

export const useListScreensAction = () => {
  const [_, dispatch] = useAppContext()
  const { loading, response, error } = useAxios<{ payload: TScreenListResponse }>({
    params: {
      url: `${routes.baseUrl}${routes.root}/${routes.screens.path}`,
      method: 'GET',
    },
  })

  useEffect(() => {
    if (response && !loading && !error) {
      dispatch({ type: ActionTypes.LIST, payload: response.data.payload })
    }

    dispatch({ type: ActionTypes.LOADING, payload: { status: !!loading, tag: 'ScreensAction' } })
  }, [loading, response, error])

  return { loading, response, error }
}
