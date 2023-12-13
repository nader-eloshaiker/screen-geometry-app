import { useCallback } from 'react'
import { ScreenActionTypes } from '../../contexts/Screen/ScreenManager'
import { useScreenContext } from '../../contexts/Screen/useScreenContext'
import { ScreenInput, ScreenItemResponse } from '../../generated/openapi/models'
import { useCreateScreenAction } from '../../generated/openapi/services/screen-list-service'
import { useAppMutation } from '../fetch/useAppMutation'

export const useCreateScreen = () => {
  const { dispatch } = useScreenContext()

  const dispatcher = useCallback(
    (data: ScreenItemResponse) => dispatch({ type: ScreenActionTypes.ADD, payload: data?.item }),
    [dispatch],
  )
  const useRequest = () => useCreateScreenAction()

  return useAppMutation<ScreenItemResponse, { data: ScreenInput }>({
    useRequest,
    callback: dispatcher,
    successMessage: 'Created: Screen configuration',
  })
}
