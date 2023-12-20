import { ScreenActionTypes } from '@contexts/Screen/ScreenManager'
import { useScreenContext } from '@contexts/Screen/useScreenContext'
import { ScreenItemResponse } from '@openapi/generated/models'
import { useShowScreen } from '@openapi/generated/services/screen-service'
import { useCallback } from 'react'
import { useApiMutation } from '../useApiMutation'

const success = { title: 'Updated', message: 'Screen visibility' }

export const useShowScreenApi = () => {
  const { dispatch } = useScreenContext()

  const apiCallback = useCallback(
    (data: ScreenItemResponse) => dispatch({ type: ScreenActionTypes.UPDATE, payload: data.item }),
    [dispatch],
  )
  const useApiRequest = () => useShowScreen()

  return useApiMutation<ScreenItemResponse, { id: string }>({
    useApiRequest,
    apiCallback,
    success,
  })
}
