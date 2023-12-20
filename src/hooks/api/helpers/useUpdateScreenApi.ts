import { ScreenActionTypes } from '@contexts/Screen/ScreenManager'
import { useScreenContext } from '@contexts/Screen/useScreenContext'
import { ScreenInput, ScreenItemResponse } from '@openapi/generated/models'
import { useUpdateScreen } from '@openapi/generated/services/screen-service'
import { useCallback } from 'react'
import { useApiMutation } from '../useApiMutation'

const success = { title: 'Updated', message: 'Screen configuration' }

export const useUpdateScreenApi = () => {
  const { dispatch } = useScreenContext()

  const apiCallback = useCallback(
    (data: ScreenItemResponse) => dispatch({ type: ScreenActionTypes.UPDATE, payload: data.item }),
    [dispatch],
  )
  const useApiRequest = () => useUpdateScreen()

  return useApiMutation<ScreenItemResponse, { id: string; data: ScreenInput }>({
    useApiRequest,
    apiCallback,
    success,
  })
}