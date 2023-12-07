import { useEffect } from 'react'
import { ErrorResponse } from 'react-router-dom'
import { NotificationActionTypes, NotificationType } from '../../contexts/Notification/NotificationManager'
import { useNotificationContext } from '../../contexts/Notification/useNotifcationContext'
import { SearchActionTypes } from '../../contexts/Search/SearchManager'
import { useSearchContext } from '../../contexts/Search/useSearchContext'
import { DataBaseEntry } from '../../models/Database'
import { useSearchListAction } from './useSearchListAction'

type ActionParams = Parameters<typeof useSearchListAction<Array<DataBaseEntry>, ErrorResponse>>
type QueryOptions = ActionParams[0]

export const useSearchList = (queryOptions?: QueryOptions) => {
  const { dispatch: dispatchSearch } = useSearchContext()
  const { dispatch: dispatchNotification } = useNotificationContext()

  const {
    isFetching: isSearchListLoading,
    error: searchListError,
    data: searchListResponse,
  } = useSearchListAction(queryOptions)

  useEffect(() => {
    if (searchListResponse && searchListResponse.length > 0) {
      dispatchSearch({ type: SearchActionTypes.LOAD, payload: searchListResponse })
    }
  }, [dispatchSearch, searchListResponse])

  useEffect(() => {
    if (searchListError) {
      dispatchNotification({
        type: NotificationActionTypes.ADD_NOTIFICATION,
        payload: { value: searchListError, type: NotificationType.ERROR },
      })
    }
  }, [dispatchNotification, searchListError])

  return { isSearchListLoading, searchListError, searchListResponse }
}
