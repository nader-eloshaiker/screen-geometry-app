import { useEffect } from 'react'
import { ActionTypes } from '../../contexts/App/AppManager'
import { useAppContext } from '../../contexts/App/useAppContext'
import { ScreenInput } from '../../generated/openapi/models'
import { useCreateScreenAction } from '../../generated/openapi/services/screen-list-service'

export const useCreateScreen = () => {
  const [_, dispatch] = useAppContext()
  const { isLoading: isCreateLoading, data: createResponse, error: createError, mutate } = useCreateScreenAction()

  useEffect(() => {
    if (createResponse) {
      dispatch({ type: ActionTypes.ADD, payload: createResponse.item })
    }
  }, [createResponse])

  const createAction = (screenInput: ScreenInput) => mutate({ data: screenInput })

  return { isCreateLoading, createError, createAction }
}
