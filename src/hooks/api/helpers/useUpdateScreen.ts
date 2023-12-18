import { ScreenActionTypes } from '@contexts/Screen/ScreenManager'
import { useScreenContext } from '@contexts/Screen/useScreenContext'
import { ScreenInput, ScreenItemResponse } from '@openapi/generated/models'
import { useUpdateScreenAction } from '@openapi/generated/services/screen-service'
import { useCallback } from 'react'
import { useApiMutation } from '../useApiMutation'

export const useUpdateScreen = () => {
  const { dispatch } = useScreenContext()

  const apiCallback = useCallback(
    (data: ScreenItemResponse) => dispatch({ type: ScreenActionTypes.UPDATE, payload: data.item }),
    [dispatch],
  )
  const useApiRequest = () => useUpdateScreenAction()

  return useApiMutation<ScreenItemResponse, { id: string; data: ScreenInput }>({
    useApiRequest,
    apiCallback,
    success: { title: 'Updated', message: 'Screen configuration' },
  })
}
