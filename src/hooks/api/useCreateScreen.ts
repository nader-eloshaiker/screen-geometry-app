import { useEffect } from 'react'
import { AppActionTypes, GeneralNotificationItem, NotificationType } from '../../contexts/App/AppManager'
import { useAppContext } from '../../contexts/App/useAppContext'
import { ScreenInput } from '../../generated/openapi/models'
import { useCreateScreenAction } from '../../generated/openapi/services/screen-list-service'

export const useCreateScreen = () => {
  const [_, dispatch] = useAppContext()
  const { isLoading: isCreateLoading, data: createResponse, error: createError, mutate } = useCreateScreenAction()

  useEffect(() => {
    if (createResponse) {
      dispatch({ type: AppActionTypes.ADD, payload: createResponse.item })
      dispatch({
        type: AppActionTypes.ADD_NOTIFICATION,
        payload: {
          value: { title: 'Success', message: 'Created: Screen configuration' } as GeneralNotificationItem,
          type: NotificationType.SUCCESS,
        },
      })
    }
  }, [createResponse])

  useEffect(() => {
    if (createError) {
      dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: { value: createError, type: NotificationType.ERROR } })
    }
  }, [createError])

  const createAction = (screenInput: ScreenInput) => mutate({ data: screenInput })

  return { isCreateLoading, createResponse, createError, createAction }
}
