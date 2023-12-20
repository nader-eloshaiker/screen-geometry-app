import { ScreenActionTypes } from '@contexts/Screen/ScreenManager'
import { useScreenContext } from '@contexts/Screen/useScreenContext'
import { ScreenInput, ScreenItemResponse } from '@openapi/generated/models'
import { useCreateScreen } from '@openapi/generated/services/screen-service'
import { useCallback } from 'react'
import { useApiMutation } from '../useApiMutation'

const successNotification = { title: 'Created', message: 'Screen configuration' }

export const useCreateScreenApi = () => {
  const { dispatch } = useScreenContext()

  const responseHandler = useCallback(
    (data: ScreenItemResponse) => dispatch({ type: ScreenActionTypes.ADD, payload: data?.item }),
    [dispatch],
  )
  const useRequest = () => useCreateScreen()

  return useApiMutation<ScreenItemResponse, { data: ScreenInput }>({
    useRequest,
    responseHandler,
    successNotification,
  })
}
