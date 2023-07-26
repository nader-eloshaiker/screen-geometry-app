import { useContext, useEffect, useState } from 'react'
import { ActionTypes, AppContext } from '../../../contexts/AppContext'
import { routes } from '../ApiRouteSchema'
import { TIdResponse } from '../db/indexApi'
import useAxios from '../fetch/useAxios'

export const useDeleteScreenAction = () => {
  const [deleteId, setDeleteId] = useState<string>()
  const [_, dispatch] = useContext(AppContext)
  const [{ response, loading, error }, { execute: executeDelete }] = useAxios<{ payload: TIdResponse }>(
    {
      url: `${routes.baseUrl}${routes.root}/${routes.screens.path}/${deleteId}`,
      method: 'DELETE',
    },
    { manualExecution: true },
  )

  useEffect(() => {
    if (response && !loading && !error) {
      dispatch({ type: ActionTypes.DELETE, payload: response.data.payload.id })
    }

    dispatch({ type: ActionTypes.LOADING, payload: loading })
  }, [loading, error, response])

  return [{ deleteId, setDeleteId, executeDelete }] as const
}
