import { useEffect } from 'react'
import { routes } from '../../api/ApiRouteSchema'
import { TScreenResponse } from '../../api/db/indexApi'
import { ActionTypes } from '../../contexts/App/AppManager'
import { useAppContext } from '../../contexts/App/useAppContext'
import { IScreen } from '../../models/Screen'
import useAxios from '../useAxios'

export const useUpdateScreenAction = () => {
  const [_, dispatch] = useAppContext()
  const { loading, response, error, execute } = useAxios<{ payload: TScreenResponse }>({
    options: { manualExecution: true },
  })

  const executeUpdate = (update: IScreen) => {
    execute({
      url: `${routes.baseUrl}${routes.basePath}/${routes.screens.path}/${update?.id}`,
      method: 'PUT',
      data: update,
    })
  }

  useEffect(() => {
    if (response && !loading && !error) {
      dispatch({ type: ActionTypes.UPDATE, payload: response.data.payload.item })
    }

    dispatch({ type: ActionTypes.LOADING, payload: { status: loading, tag: 'UpdateScreenAction' } })
  }, [loading, error, response])

  return { loading, response, error, execute, executeUpdate }
}
