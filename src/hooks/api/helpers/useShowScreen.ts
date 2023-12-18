import { ScreenActionTypes } from '@contexts/Screen/ScreenManager'
import { useScreenContext } from '@contexts/Screen/useScreenContext'
import { ScreenItemResponse } from '@openapi/generated/models'
import { useShowScreenAction } from '@openapi/generated/services/screen-action-service'
import { useCallback } from 'react'
import { useApiMutation } from '../useApiMutation'

const success = { title: 'Updated', message: 'Screen visibility' }

export const useShowScreen = () => {
  const { dispatch } = useScreenContext()

  const apiCallback = useCallback(
    (data: ScreenItemResponse) => dispatch({ type: ScreenActionTypes.UPDATE, payload: data.item }),
    [dispatch],
  )
  const useApiRequest = () => useShowScreenAction()

  return useApiMutation<ScreenItemResponse, { id: string }>({
    useApiRequest,
    apiCallback,
    success,
  })
}
