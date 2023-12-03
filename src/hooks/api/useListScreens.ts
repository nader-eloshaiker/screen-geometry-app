import { useEffect } from 'react'
import { ErrorResponse } from 'react-router-dom'
import { NotificationActionTypes, NotificationType } from '../../contexts/Notification/NotificationManager'
import { useNotificationContext } from '../../contexts/Notification/useNotifcationContext'
import { ScreenActionTypes } from '../../contexts/Screen/ScreenManager'
import { useScreenContext } from '../../contexts/Screen/useScreenContext'
import { ScreenListResponse } from '../../generated/openapi/models'
import { useListScreensAction } from '../../generated/openapi/services/screen-list-service'

// export type ListScreenOptions = UseQueryOptions<
//   Awaited<ReturnType<ReturnType<typeof useListScreensActionHook>>>,
//   ErrorResponse,
//   ScreenListResponse
// >

type ActionParams = Parameters<typeof useListScreensAction<ScreenListResponse, ErrorResponse>>
type QueryOptions = ActionParams[0]

export const useListScreens = (queryOptions?: QueryOptions) => {
  const { dispatch: dispatchScreen } = useScreenContext()
  const { dispatch: dispatchNotification } = useNotificationContext()
  const {
    isFetching: isScreenListLoading,
    error: screenListError,
    data: screenListResponse,
  } = useListScreensAction<ScreenListResponse, ErrorResponse>(queryOptions)

  useEffect(() => {
    if (screenListResponse && screenListResponse.list.length > 0) {
      dispatchScreen({ type: ScreenActionTypes.LIST, payload: screenListResponse.list })
    }
  }, [dispatchScreen, screenListResponse])

  useEffect(() => {
    if (screenListError) {
      dispatchNotification({
        type: NotificationActionTypes.ADD_NOTIFICATION,
        payload: { value: screenListError, type: NotificationType.ERROR },
      })
    }
  }, [dispatchNotification, screenListError])

  return { isScreenListLoading, screenListResponse, screenListError }
}
