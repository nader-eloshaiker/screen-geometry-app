import { useContext, useEffect, useState } from 'react'
import { IScreen } from '../../../models/Screen'
import { routes } from '../ApiRouteSchema'
import { ActionTypes, DataContext } from '../DataProvider'
import { TScreenResponse } from '../db/indexApi'
import useAxios from '../fetch/useAxios'

export const useUpdateScreenAction = () => {
  const [updateData, setUpdateData] = useState<IScreen>()
  const [_, dispatch] = useContext(DataContext)
  const [{ response, loading, error }, { execute }] = useAxios<{ payload: TScreenResponse }>(
    {
      url: `${routes.baseUrl}${routes.root}/${routes.screens.path}/${updateData?.id}`,
      method: 'PATCH',
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

    dispatch({ type: ActionTypes.LOADING, payload: loading })
  }, [loading, error, response])

  return [{ updateData, setUpdateData, executeUpdate }] as const
}
