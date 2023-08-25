import { useEffect } from 'react'
import { AppActionTypes, NotificationType } from '../../contexts/App/AppManager'
import { useAppContext } from '../../contexts/App/useAppContext'
import { useListScreensAction } from '../../generated/openapi/services/screen-list-service'

export const useListScreens = () => {
  const [_, dispatch] = useAppContext()
  const { isLoading: isScreenListLoading, error: screenListError, data: screenListResponse } = useListScreensAction()

  useEffect(() => {
    if (screenListResponse && screenListResponse.list.length > 0) {
      dispatch({ type: AppActionTypes.LIST, payload: screenListResponse.list })
    }
  }, [screenListResponse])

  useEffect(() => {
    if (screenListError) {
      dispatch({
        type: AppActionTypes.ADD_NOTIFICATION,
        payload: { value: screenListError, type: NotificationType.ERROR },
      })
    }
  }, [screenListError])

  return { isScreenListLoading, screenListResponse, screenListError }
}
