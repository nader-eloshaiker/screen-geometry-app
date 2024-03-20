import { ScreenActionTypes } from '@contexts/Screen/ScreenManager'
import { useScreenContext } from '@contexts/Screen/useScreenContext'
import { ScreenIdResponse, useDeleteScreen } from '@screengeometry/openapi'
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
