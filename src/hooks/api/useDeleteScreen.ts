import { useEffect } from 'react'
import { AppActionTypes, GeneralNotificationItem, NotificationType } from '../../contexts/App/AppManager'
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
      dispatch({
        type: AppActionTypes.ADD_NOTIFICATION,
        payload: {
          value: { title: 'Success', message: 'Deleted: Screen configuration' } as GeneralNotificationItem,
          type: NotificationType.SUCCESS,
        },
      })
    }
  }, [deleteResponse])

  useEffect(() => {
    if (deleteError) {
      dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: { value: deleteError, type: NotificationType.ERROR } })
    }
  }, [deleteError])

  return { isDeleteLoading, deleteResponse, deleteError, deleteAction }
}
