import { ScreenActionTypes } from '@contexts/Screen/ScreenManager'
import { useScreenContext } from '@contexts/Screen/useScreenContext'
import { ScreenInputList, ScreenListResponse } from '@openapi/generated/models'
import { useCreateScreenList } from '@openapi/generated/services/screen-list-service'
import { useCallback } from 'react'
import { useApiMutation } from '../useApiMutation'

const successNotification = { title: 'Created', message: 'Screen list' }

export const useCreateScreenListApi = () => {
  const { dispatch } = useScreenContext()
  const responseHandler = useCallback(
    (data: ScreenListResponse) => dispatch({ type: ScreenActionTypes.ADD_LIST, payload: data.list }),
    [dispatch],
  )
  const useRequest = () => useCreateScreenList()

  return useApiMutation<ScreenListResponse, { data: ScreenInputList }>({
    useRequest,
    responseHandler,
    successNotification,
  })
}
