import { ScreenActionTypes } from '@local/contexts/Screen/ScreenManager'
import { useScreenContext } from '@local/contexts/Screen/useScreenContext'
import { ScreenIdResponse, useDeleteScreen } from '@packages/openapi/generated'
import { useCallback } from 'react'
import { useApiEffectHandler } from '../useApiEffectHandler'

const successNotification = { title: 'Deleted', message: 'Screen configuration' }

export const useDeleteScreenApi = () => {
  const { dispatch } = useScreenContext()
  const responseHandler = useCallback(
    (data: ScreenIdResponse) => dispatch({ type: ScreenActionTypes.DELETE, payload: data.id }),
    [dispatch],
  )
  const request = useDeleteScreen()

  useApiEffectHandler<ScreenIdResponse>({
    data: request.data,
    error: request.error,
    responseHandler,
    successNotification,
  })

  return request
}
