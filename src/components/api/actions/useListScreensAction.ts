import { useContext, useEffect } from 'react'
import { ActionTypes, AppContext } from '../../../contexts/AppContext'
import { routes } from '../ApiRouteSchema'
import { TScreenListResponse } from '../db/indexApi'
import useAxios from '../fetch/useAxios'

export const useListScreensAction = () => {
  const [_dataState, dispatch] = useContext(AppContext)
  const [{ response, loading, error }] = useAxios<{ payload: TScreenListResponse }>({
    url: `${routes.baseUrl}${routes.root}/${routes.screens.path}`,
    method: 'GET',
  })

  useEffect(() => {
    if (response && !loading && !error) {
      dispatch({ type: ActionTypes.LIST, payload: response.data.payload })
    }

    dispatch({ type: ActionTypes.LOADING, payload: loading })
  }, [loading, error, response])
}
