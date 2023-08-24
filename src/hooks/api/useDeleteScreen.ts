import { useEffect } from 'react'
import { AppActionTypes } from '../../contexts/App/AppManager'
import { useAppContext } from '../../contexts/App/useAppContext'
import { useDeleteScreenAction } from '../../generated/openapi/services/screen-service'

export const useDeleteScreen = () => {
  const [_, dispatch] = useAppContext()
  const {
    isLoading: isDeleteLoading,
    data: deleteResponse,
    error: deleteError,
    mutate: deleteAction,
  } = useDeleteScreenAction()

  useEffect(() => {
    if (deleteResponse) {
      dispatch({ type: AppActionTypes.DELETE, payload: deleteResponse.id })
    }
  }, [deleteResponse])

  return { isDeleteLoading, deleteError, deleteAction }
}
