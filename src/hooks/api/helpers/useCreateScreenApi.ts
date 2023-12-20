import { ScreenActionTypes } from '@contexts/Screen/ScreenManager'
import { useScreenContext } from '@contexts/Screen/useScreenContext'
import { ScreenInput, ScreenItemResponse } from '@openapi/generated/models'
import { useCreateScreen } from '@openapi/generated/services/screen-service'
import { useCallback } from 'react'
import { useApiMutation } from '../useApiMutation'

const success = { title: 'Created', message: 'Screen configuration' }

export const useCreateScreenApi = () => {
  const { dispatch } = useScreenContext()

  const apiCallback = useCallback(
    (data: ScreenItemResponse) => dispatch({ type: ScreenActionTypes.ADD, payload: data?.item }),
    [dispatch],
  )
  const useApiRequest = () => useCreateScreen()

  return useApiMutation<ScreenItemResponse, { data: ScreenInput }>({
    useApiRequest,
    apiCallback,
    success,
  })
}
