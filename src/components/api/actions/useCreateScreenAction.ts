import { useContext, useEffect } from 'react'
import { routes } from '../ApiRouteSchema'
import { ActionTypes, DataContext } from '../DataProvider'
import { TScreenResponse } from '../db/indexApi'
import useAxios from '../fetch/useAxios'

export const useCreateScreenAction = () => {
  const [_, dispatch] = useContext(DataContext)
  const [{ response, loading, error }, { execute: executeCreate }] = useAxios<{ payload: TScreenResponse }>(
    { url: `${routes.baseUrl}${routes.root}/${routes.screens.path}/${routes.screens.actions.create}`, method: 'POST' },
    { manualExecution: true },
  )

  useEffect(() => {
    if (response && !loading && !error) {
      dispatch({ type: ActionTypes.CREATE, payload: response.data.payload.item })
    }

    dispatch({ type: ActionTypes.LOADING, payload: loading })
  }, [loading, error, response])

  return [{ executeCreate }] as const
}
