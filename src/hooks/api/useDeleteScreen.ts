import { useCallback } from 'react'
import { ScreenActionTypes } from '../../contexts/Screen/ScreenManager'
import { useScreenContext } from '../../contexts/Screen/useScreenContext'
import { ScreenIdResponse } from '../../generated/openapi/models'
import { useDeleteScreenAction } from '../../generated/openapi/services/screen-service'
import { useApiMutation } from '../fetch/useApiMutation'

const success = { title: 'Deleted', message: 'Screen configuration' }

export const useDeleteScreen = () => {
  const { dispatch } = useScreenContext()

  const apiCallback = useCallback(
    (data: ScreenIdResponse) => dispatch({ type: ScreenActionTypes.DELETE, payload: data.id }),
    [dispatch],
  )
  const useApiRequest = () => useDeleteScreenAction()

  return useApiMutation<ScreenIdResponse, { id: string }>({
    useApiRequest,
    apiCallback,
    success,
  })
}
