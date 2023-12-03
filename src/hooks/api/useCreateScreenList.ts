import { UseMutationOptions } from '@tanstack/react-query'
import { useEffect } from 'react'
import {
  GeneralNotificationItem,
  NotificationActionTypes,
  NotificationType,
} from '../../contexts/Notification/NotificationManager'
import { useNotificationContext } from '../../contexts/Notification/useNotifcationContext'
import { ScreenActionTypes } from '../../contexts/Screen/ScreenManager'
import { useScreenContext } from '../../contexts/Screen/useScreenContext'
import { ErrorResponse, ScreenInputList, ScreenListResponse } from '../../generated/openapi/models'
import {
  useCreateScreenListAction,
  useCreateScreenListActionHook,
} from '../../generated/openapi/services/screen-list-service'

export type CreateListScreenOptions = UseMutationOptions<
  Awaited<ReturnType<ReturnType<typeof useCreateScreenListActionHook>>>,
  ErrorResponse,
  { data: ScreenInputList }
>
type ActionParams = Parameters<typeof useCreateScreenListAction<ScreenListResponse, ErrorResponse>>
type QueryOptions = ActionParams[0]

export const useCreateScreenList = (queryOptions?: QueryOptions) => {
  const { dispatch: dispatchScreen } = useScreenContext()
  const { dispatch: dispatchNotification } = useNotificationContext()
  const {
    isPending: isCreateListLoading,
    data: createListResponse,
    error: createListError,
    mutate,
  } = useCreateScreenListAction(queryOptions)

  useEffect(() => {
    if (createListResponse) {
      dispatchScreen({ type: ScreenActionTypes.ADD_LIST, payload: createListResponse.list })
      dispatchNotification({
        type: NotificationActionTypes.ADD_NOTIFICATION,
        payload: {
          value: { title: 'Success', message: 'Created: Screen configuration' } as GeneralNotificationItem,
          type: NotificationType.SUCCESS,
        },
      })
    }
  }, [createListResponse, dispatchNotification, dispatchScreen])

  useEffect(() => {
    if (createListError) {
      dispatchNotification({
        type: NotificationActionTypes.ADD_NOTIFICATION,
        payload: { value: createListError, type: NotificationType.ERROR },
      })
    }
  }, [createListError, dispatchNotification])

  const createListAction = (screenInputList: ScreenInputList) => mutate({ data: screenInputList })

  return {
    isCreateListLoading,
    createListResponse,
    createListError,
    createListAction,
  }
}
