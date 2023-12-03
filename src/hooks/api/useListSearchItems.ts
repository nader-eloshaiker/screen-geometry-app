import { useEffect } from 'react'
import { ErrorResponse } from 'react-router-dom'
import { NotificationActionTypes, NotificationType } from '../../contexts/Notification/NotificationManager'
import { useNotificationContext } from '../../contexts/Notification/useNotifcationContext'
import { SearchActionTypes } from '../../contexts/Search/SearchManager'
import { useSearchContext } from '../../contexts/Search/useSearchContext'
import { DataBaseEntry } from '../../models/Database'
import { useListSearchItemsAction } from './useListSearchItemsAction'

type ActionParams = Parameters<typeof useListSearchItemsAction<Array<DataBaseEntry>, ErrorResponse>>
type ListSearchItemsOptions = ActionParams[0]

export const useListSearchItems = (queryOptions?: ListSearchItemsOptions) => {
  const { dispatch: dispatchScreen } = useSearchContext()
  const { dispatch: dispatchNotification } = useNotificationContext()

  const { isFetching, error, data } = useListSearchItemsAction(queryOptions)

  useEffect(() => {
    if (data && data.length > 0) {
      dispatchScreen({ type: SearchActionTypes.LOAD, payload: data })
    }
  }, [dispatchScreen, data])

  useEffect(() => {
    if (error) {
      dispatchNotification({
        type: NotificationActionTypes.ADD_NOTIFICATION,
        payload: { value: error, type: NotificationType.ERROR },
      })
    }
  }, [dispatchNotification, error])

  return { isFetching, error, data }
}
