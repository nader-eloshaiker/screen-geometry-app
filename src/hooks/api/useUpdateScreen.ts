import { useEffect } from 'react'
import { AppActionTypes } from '../../contexts/App/AppManager'
import { useAppContext } from '../../contexts/App/useAppContext'
import { ScreenItem } from '../../generated/openapi/models'
import { useUpdateScreenAction } from '../../generated/openapi/services/screen-service'

export const useUpdateScreen = () => {
  const [_, dispatch] = useAppContext()
  const { isLoading: isUpdateLoading, data: updateResponse, error: updateError, mutate } = useUpdateScreenAction()

  useEffect(() => {
    if (updateResponse) {
      dispatch({ type: AppActionTypes.UPDATE, payload: updateResponse.item })
    }
  }, [updateResponse])

  useEffect(() => {
    if (updateError) {
      dispatch({ type: AppActionTypes.ADD_ERROR, payload: updateError })
    }
  }, [updateError])

  const updateAction = (screen: ScreenItem) => mutate({ id: screen.id, data: screen })

  return { isUpdateLoading, updateResponse, updateError, updateAction }
}
