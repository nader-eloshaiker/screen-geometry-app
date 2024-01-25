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
  const request = useRequest()

  useEffect(() => {
    if (!responseHandler || !request.data) {
      return
    }
    responseHandler(request.data)
  }, [responseHandler, request.data])

  useEffect(() => {
    if (request.error) {
      dispatch({
        type: NotificationActionTypes.ADD_NOTIFICATION,
        payload: { value: request.error, type: NotificationType.ERROR },
      })
    }
  }, [dispatch, request.error])

  return request
}
