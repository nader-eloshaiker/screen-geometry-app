import { NotificationActionTypes, NotificationType } from '@contexts/Notification/NotificationManager'
import { useNotificationContext } from '@contexts/Notification/useNotifcationContext'
import { ErrorResponse } from '@openapi/generated/models'
import type { QueryKey, UseQueryResult } from '@tanstack/react-query'
import { useEffect } from 'react'

export const useApiQuery = <TData, TError = ErrorResponse>({
  useRequest,
  responseHandler,
}: {
  useRequest(): UseQueryResult<TData, TError> & { queryKey: QueryKey }
  responseHandler?(data: TData | undefined): void
}) => {
  const { dispatch } = useNotificationContext()
  const { isFetching, error, data } = useRequest()

  useEffect(() => {
    if (!responseHandler || !data) {
      return
    }
    responseHandler(data)
  }, [responseHandler, data])

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
