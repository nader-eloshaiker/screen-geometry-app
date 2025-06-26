import { ScreenEventTypes } from '@/app/contexts/Screen/ScreenManager'
import { useScreenContext } from '@/app/contexts/Screen/useScreenContext'
import { ScreenIdResponse, useDeleteScreen } from '@/lib/openapi/generated'
import { useCallback } from 'react'
import { useApiEffectHandler } from '../useApiEffectHandler'

const successNotification = { title: 'Deleted', message: 'Screen specifications have been deleted' }

export const useDeleteScreenApi = () => {
  const { dispatch } = useScreenContext()
  const responseHandler = useCallback(
    (data: ScreenIdResponse) => dispatch({ type: ScreenEventTypes.DELETE, payload: data.id }),
    [dispatch]
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
