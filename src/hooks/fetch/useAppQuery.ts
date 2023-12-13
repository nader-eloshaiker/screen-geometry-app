import type { QueryKey, UseQueryResult } from '@tanstack/react-query'
import { useEffect } from 'react'
import { NotificationActionTypes, NotificationType } from '../../contexts/Notification/NotificationManager'
import { useNotificationContext } from '../../contexts/Notification/useNotifcationContext'
import { ErrorResponse } from '../../generated/openapi/models'

export const useAppQuery = <TData, TError = ErrorResponse>({
  useRequest,
  callback,
}: {
  useRequest(): UseQueryResult<TData, TError> & { queryKey: QueryKey }
  callback?(data: TData | undefined): void
}) => {
  const { dispatch } = useNotificationContext()
  const { isFetching, error, data } = useRequest()

  useEffect(() => {
    if (!callback || !data) {
      return
    }
    callback(data)
  }, [callback, data])

  useEffect(() => {
    if (error) {
      dispatch({
        type: NotificationActionTypes.ADD_NOTIFICATION,
        payload: { value: error, type: NotificationType.ERROR },
      })
    }
  }, [dispatch, error])

  return { isFetching, data, error }
}
