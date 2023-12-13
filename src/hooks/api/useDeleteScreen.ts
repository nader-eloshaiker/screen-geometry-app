import { useCallback } from 'react'
import { ScreenActionTypes } from '../../contexts/Screen/ScreenManager'
import { useScreenContext } from '../../contexts/Screen/useScreenContext'
import { ScreenIdResponse } from '../../generated/openapi/models'
import { useDeleteScreenAction } from '../../generated/openapi/services/screen-service'
import { useAppMutation } from '../fetch/useAppMutation'

const success = { title: 'Deleted', message: 'Screen configuration' }

export const useDeleteScreen = () => {
  const { dispatch } = useScreenContext()

  const callback = useCallback(
    (data: ScreenIdResponse) => dispatch({ type: ScreenActionTypes.DELETE, payload: data.id }),
    [dispatch],
  )
  const useRequest = () => useDeleteScreenAction()

  return useAppMutation<ScreenIdResponse, { id: string }>({
    useRequest,
    callback,
    success,
  })
}
