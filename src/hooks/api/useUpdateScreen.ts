import { useEffect } from 'react'
import { ActionTypes } from '../../contexts/App/AppManager'
import { useAppContext } from '../../contexts/App/useAppContext'
import { ScreenItem } from '../../generated/openapi/models'
import { useUpdateScreenAction } from '../../generated/openapi/services/screen-service'

export const useUpdateScreen = () => {
  const [_, dispatch] = useAppContext()
  const { isLoading: isUpdateLoading, data: updateResponse, error: updateError, mutate } = useUpdateScreenAction()

  useEffect(() => {
    if (updateResponse) {
      dispatch({ type: ActionTypes.UPDATE, payload: updateResponse.item })
    }
  }, [updateResponse])

  const updateAction = (screen: ScreenItem) => mutate({ id: screen.id, data: screen })

  return { isUpdateLoading, updateError, updateAction }
}
