import { ScreenActionTypes } from '@contexts/Screen/ScreenManager'
import { useScreenContext } from '@contexts/Screen/useScreenContext'
import { ScreenIdResponse } from '@openapi/models'
import { useDeleteScreenAction } from '@openapi/services/screen-service'
import { useCallback } from 'react'
import { useApiMutation } from '../useApiMutation'

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
