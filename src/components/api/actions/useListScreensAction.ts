import { useContext, useEffect } from 'react'
import { routes } from '../ApiRouteSchema'
import { ActionTypes, DataContext } from '../DataProvider'
import { TScreenListResponse } from '../db/indexApi'
import useAxios from '../fetch/useAxios'

export const useListScreensAction = () => {
  const [_dataState, dispatch] = useContext(DataContext)
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
