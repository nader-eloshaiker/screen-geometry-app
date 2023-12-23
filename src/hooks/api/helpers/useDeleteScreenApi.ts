import { ScreenActionTypes } from '@contexts/Screen/ScreenManager'
import { useScreenContext } from '@contexts/Screen/useScreenContext'
import { ScreenIdResponse } from '@openapi/generated/models'
import { useDeleteScreen } from '@openapi/generated/services/screen-service'
import { useCallback } from 'react'
import { useApiMutation } from '../useApiMutation'

const successNotification = { title: 'Deleted', message: 'Screen configuration' }

export const useDeleteScreenApi = () => {
  const { dispatch } = useScreenContext()

  const responseHandler = useCallback(
    (data: ScreenIdResponse) => dispatch({ type: ScreenActionTypes.DELETE, payload: data.id }),
    [dispatch],
  )
  const useRequest = () => useDeleteScreen()

  return useApiMutation<ScreenIdResponse, { id: string }>({
    useRequest,
    responseHandler,
    successNotification,
  })
}
