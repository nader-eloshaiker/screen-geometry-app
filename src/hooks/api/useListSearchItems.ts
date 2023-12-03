import { useEffect } from 'react'
import { ErrorResponse } from 'react-router-dom'
import { NotificationActionTypes, NotificationType } from '../../contexts/Notification/NotificationManager'
import { useNotificationContext } from '../../contexts/Notification/useNotifcationContext'
import { SearchActionTypes } from '../../contexts/Search/SearchManager'
import { useSearchContext } from '../../contexts/Search/useSearchContext'
import { DataBaseEntry } from '../../models/Database'
import { useListSearchItemsAction } from './useListSearchItemsAction'

type ActionParams = ArgumentTypes<typeof useListSearchItemsAction>
type ListSearchItemsOptions = ActionParams[0]

export const useListSearchItems = (queryOptions?: ListSearchItemsOptions) => {
  const { dispatch: dispatchScreen } = useSearchContext()
  const { dispatch: dispatchNotification } = useNotificationContext()

  const {
    isFetching: isSearchItemsLoading,
    error: searchItemsError,
    data: searchItemsResponse,
  } = useListSearchItemsAction<Array<DataBaseEntry>, ErrorResponse>(queryOptions)

  useEffect(() => {
    if (searchItemsResponse && searchItemsResponse.length > 0) {
      dispatchScreen({ type: SearchActionTypes.LOAD, payload: searchItemsResponse })
    }
  }, [dispatchScreen, searchItemsResponse])

  useEffect(() => {
    if (searchItemsError) {
      dispatchNotification({
        type: NotificationActionTypes.ADD_NOTIFICATION,
        payload: { value: searchItemsError, type: NotificationType.ERROR },
      })
    }
  }, [dispatchNotification, searchItemsError])

  return { isSearchItemsLoading, searchItemsResponse, searchItemsError }
}
