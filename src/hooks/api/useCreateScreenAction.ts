import { useEffect } from 'react'
import { routes } from '../../api/ApiRouteSchema'
import { TScreenResponse } from '../../api/db/indexApi'
import { ActionTypes } from '../../contexts/App/AppManager'
import { useAppContext } from '../../contexts/App/useAppContext'
import { IScreenDataInput } from '../../models/Screen'
import useAxios from '../useAxios'

export const useCreateScreenAction = () => {
  const [_, dispatch] = useAppContext()
  const { response, loading, error, execute } = useAxios<{ payload: TScreenResponse }>({
    options: { manualExecution: true },
  })

  const executeCreate = (data: IScreenDataInput) => {
    execute({
      url: `${routes.baseUrl}${routes.root}/${routes.screens.path}/${routes.screens.actions.create}`,
      method: 'POST',
      data: data,
    })
  }

  useEffect(() => {
    if (response && !loading && !error) {
      dispatch({ type: ActionTypes.ADD, payload: response.data.payload.item })
    }

    dispatch({ type: ActionTypes.LOADING, payload: { status: loading, tag: 'CreateScreenAction' } })
  }, [loading, error, response])

  return { loading, response, error, executeCreate }
}
