import { ScreenActionTypes } from '@contexts/Screen/ScreenManager'
import { useScreenContext } from '@contexts/Screen/useScreenContext'
import { ScreenInput, ScreenItemResponse } from '@openapi/generated/models'
import { useUpdateScreen } from '@openapi/generated/services/screen-service'
import { useCallback } from 'react'
import { useApiMutation } from '../useApiMutation'

const successNotification = { title: 'Updated', message: 'Screen configuration' }

export const useUpdateScreenApi = () => {
  const { dispatch } = useScreenContext()

  const responseHandler = useCallback(
    (data: ScreenItemResponse) => dispatch({ type: ScreenActionTypes.UPDATE, payload: data.item }),
    [dispatch],
  )
  const useRequest = () => useUpdateScreen()

  return useApiMutation<ScreenItemResponse, { id: string; data: ScreenInput }>({
    useRequest,
    responseHandler,
    successNotification,
  })
}
