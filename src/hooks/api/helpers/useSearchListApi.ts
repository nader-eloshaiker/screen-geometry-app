import { NotificationActionTypes, NotificationType } from '@contexts/Notification/NotificationManager'
import { useNotificationContext } from '@contexts/Notification/useNotifcationContext'
import { GetSearchListParams } from '@openapi/generated/models'
import { useGetSearchList } from '@openapi/generated/services/search-list-service'
import { keepPreviousData } from '@tanstack/react-query'
import { useEffect } from 'react'

// type ActionParams = Parameters<typeof useSearchList<SearchListResponse>, ErrorResponse>>
// type QueryOptions = ActionParams[0]

export const useSearchListApi = (params: GetSearchListParams) => {
  const { dispatch } = useNotificationContext()

  const response = useGetSearchList(params, {
    query: { queryKey: ['useGetSearchList', ...Object.values(params)], placeholderData: keepPreviousData },
  })

  // Note: debugging only, remove when done
  if (!response) {
    console.error('request: is undefined')
    // console.trace()
  }

  useEffect(() => {
    if (response.error) {
      dispatch({
        type: NotificationActionTypes.ADD_NOTIFICATION,
        payload: { value: response.error, type: NotificationType.ERROR },
      })
    }
  }, [dispatch, response.error])

  return response
}
