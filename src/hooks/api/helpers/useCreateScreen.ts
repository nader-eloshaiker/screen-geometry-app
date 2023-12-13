import { ScreenActionTypes } from '@contexts/Screen/ScreenManager'
import { useScreenContext } from '@contexts/Screen/useScreenContext'
import { ScreenInput, ScreenItemResponse } from '@openapi/models'
import { useCreateScreenAction } from '@openapi/services/screen-list-service'
import { useCallback } from 'react'
import { useApiMutation } from '../useApiMutation'

const success = { title: 'Created', message: 'Screen configuration' }

export const useCreateScreen = () => {
  const { dispatch } = useScreenContext()

  const apiCallback = useCallback(
    (data: ScreenItemResponse) => dispatch({ type: ScreenActionTypes.ADD, payload: data?.item }),
    [dispatch],
  )
  const useApiRequest = () => useCreateScreenAction()

  return useApiMutation<ScreenItemResponse, { data: ScreenInput }>({
    useApiRequest,
    apiCallback,
    success,
  })
}
