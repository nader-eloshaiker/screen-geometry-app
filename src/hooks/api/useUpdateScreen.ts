import { useCallback } from 'react'
import { ScreenActionTypes } from '../../contexts/Screen/ScreenManager'
import { useScreenContext } from '../../contexts/Screen/useScreenContext'
import { ScreenInput, ScreenItemResponse } from '../../generated/openapi/models'
import { useUpdateScreenAction } from '../../generated/openapi/services/screen-service'
import { useAppMutation } from '../fetch/useAppMutation'

export const useUpdateScreen = () => {
  const { dispatch } = useScreenContext()

  const dispatcher = useCallback(
    (data: ScreenItemResponse) => dispatch({ type: ScreenActionTypes.UPDATE, payload: data.item }),
    [dispatch],
  )
  const useRequest = () => useUpdateScreenAction()

  return useAppMutation<ScreenItemResponse, { id: string; data: ScreenInput }>({
    useRequest,
    callback: dispatcher,
    successMessage: 'Updated: Screen configuration',
  })
}
