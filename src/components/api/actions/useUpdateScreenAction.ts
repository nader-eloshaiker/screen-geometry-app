import { useEffect, useState } from 'react'
import { ActionTypes } from '../../../contexts/App/AppContext'
import { useAppContext } from '../../../contexts/App/useAppContext'
import { IScreen } from '../../../models/Screen'
import { routes } from '../ApiRouteSchema'
import { TScreenResponse } from '../db/indexApi'
import useAxios from '../fetch/useAxios'

export const useUpdateScreenAction = () => {
  const [updateData, setUpdateData] = useState<IScreen>()
  const [_, dispatch] = useAppContext()
  const [{ response, loading, error }, { execute }] = useAxios<{ payload: TScreenResponse }>(
    {
      url: `${routes.baseUrl}${routes.root}/${routes.screens.path}/${updateData?.id}`,
      method: 'PUT',
    },
    { manualExecution: true },
  )

  const executeUpdate = () => {
    execute(updateData)
  }

  useEffect(() => {
    if (response && !loading && !error) {
      dispatch({ type: ActionTypes.UPDATE, payload: response.data.payload.item })
    }

    dispatch({ type: ActionTypes.LOADING, payload: { status: loading, tag: 'useUpdateScreenAction' } })
  }, [loading, error, response])

  return [{ updateData, setUpdateData, executeUpdate }] as const
}
