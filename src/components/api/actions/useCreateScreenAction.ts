import { useEffect } from 'react'
import { ActionTypes } from '../../../contexts/App/AppContext'
import { useAppContext } from '../../../contexts/App/useAppContext'
import { routes } from '../ApiRouteSchema'
import { TScreenResponse } from '../db/indexApi'
import useAxios from '../fetch/useAxios'

export const useCreateScreenAction = () => {
  const [_, dispatch] = useAppContext()
  const [{ response, loading, error }, { execute: executeCreate }] = useAxios<{ payload: TScreenResponse }>(
    { url: `${routes.baseUrl}${routes.root}/${routes.screens.path}/${routes.screens.actions.create}`, method: 'POST' },
    { manualExecution: true },
  )

  useEffect(() => {
    if (response && !loading && !error) {
      dispatch({ type: ActionTypes.ADD, payload: response.data.payload.item })
    }

    dispatch({ type: ActionTypes.LOADING, payload: { status: loading, tag: 'useCreateScreenAction' } })
  }, [loading, error, response])

  return [{ executeCreate }] as const
}
