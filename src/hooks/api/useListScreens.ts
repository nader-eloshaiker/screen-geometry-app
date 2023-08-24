import { useEffect } from 'react'
import { ActionTypes } from '../../contexts/App/AppManager'
import { useAppContext } from '../../contexts/App/useAppContext'
import { useListScreensAction } from '../../generated/openapi/services/screen-list-service'

export const useListScreens = () => {
  const [_, dispatch] = useAppContext()
  const { isLoading: isScreenListLoading, error: screenListError, data: screenListResponse } = useListScreensAction()

  useEffect(() => {
    if (screenListResponse && screenListResponse.list.length > 0) {
      dispatch({ type: ActionTypes.LIST, payload: screenListResponse.list })
    }
  }, [screenListResponse])

  return { isScreenListLoading, screenListError }
}
