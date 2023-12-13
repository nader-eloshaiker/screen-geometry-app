import { useCallback } from 'react'
import { ScreenActionTypes } from '../../contexts/Screen/ScreenManager'
import { useScreenContext } from '../../contexts/Screen/useScreenContext'
import { ScreenItemResponse } from '../../generated/openapi/models'
import { useShowScreenAction } from '../../generated/openapi/services/screen-action-service'
import { useAppMutation } from '../fetch/useAppMutation'

export const useShowScreen = () => {
  const { dispatch } = useScreenContext()

  const dispatcher = useCallback(
    (data: ScreenItemResponse) => dispatch({ type: ScreenActionTypes.UPDATE, payload: data.item }),
    [dispatch],
  )
  const useRequest = () => useShowScreenAction()

  return useAppMutation<ScreenItemResponse, { id: string }>({
    useRequest,
    callback: dispatcher,
    successMessage: 'Updated: Screen visibility',
  })
}
