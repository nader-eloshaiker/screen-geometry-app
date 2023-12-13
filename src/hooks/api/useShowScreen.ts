import { useCallback } from 'react'
import { ScreenActionTypes } from '../../contexts/Screen/ScreenManager'
import { useScreenContext } from '../../contexts/Screen/useScreenContext'
import { ScreenItemResponse } from '../../generated/openapi/models'
import { useShowScreenAction } from '../../generated/openapi/services/screen-action-service'
import { useApiMutation } from '../fetch/useApiMutation'

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
