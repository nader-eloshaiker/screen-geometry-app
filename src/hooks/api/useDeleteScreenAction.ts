import { useEffect } from 'react'
import { routes } from '../../api/ApiRouteSchema'
import { TIdResponse } from '../../api/db/indexApi'
import { ActionTypes } from '../../contexts/App/AppManager'
import { useAppContext } from '../../contexts/App/useAppContext'
import useAxios from '../useAxios'

export const useDeleteScreenAction = () => {
  const [_, dispatch] = useAppContext()
  const { loading, response, error, execute } = useAxios<{ payload: TIdResponse }>({
    options: { manualExecution: true },
  })

  const executeDelete = (id: string) => {
    execute({
      url: `${routes.baseUrl}${routes.root}/${routes.screens.path}/${id}`,
      method: 'DELETE',
    })
  }

  useEffect(() => {
    if (response && !loading && !error) {
      dispatch({ type: ActionTypes.DELETE, payload: response.data.payload.id })
    }

    dispatch({ type: ActionTypes.LOADING, payload: { status: loading, tag: 'DeleteScreenAction' } })
  }, [loading, error, response])

  return { loading, response, error, executeDelete }
}
