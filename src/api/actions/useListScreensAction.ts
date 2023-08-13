import { useEffect } from 'react'
import { ActionTypes } from '../../contexts/App/AppManager'
import { useAppContext } from '../../contexts/App/useAppContext'
import { routes } from '../ApiRouteSchema'
import { TScreenListResponse } from '../db/indexApi'
import useAxios from '../fetch/useAxios'

export const useListScreensAction = () => {
  const [_dataState, dispatch] = useAppContext()
  const [{ response, loading, error }] = useAxios<{ payload: TScreenListResponse }>({
    url: `${routes.baseUrl}${routes.root}/${routes.screens.path}`,
    method: 'GET',
  })

  useEffect(() => {
    dispatch({ type: ActionTypes.LOADING, payload: { status: loading, tag: 'useListScreensAction' } })

    if (response && !loading && !error) {
      dispatch({ type: ActionTypes.LIST, payload: response.data.payload })
    }
  }, [loading, error, response])
}
