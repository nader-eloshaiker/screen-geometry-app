import { ScreenEventTypes } from '@app/contexts/Screen/ScreenManager'
import { useScreenContext } from '@app/contexts/Screen/useScreenContext'
import { ScreenItemResponse, useShowScreen } from '@packages/openapi/generated'
import { useCallback } from 'react'
import { useApiEffectHandler } from '../useApiEffectHandler'

const successNotification = { title: 'Updated', message: 'Screen visibility' }

export const useShowScreenApi = () => {
  const { dispatch } = useScreenContext()
  const responseHandler = useCallback(
    (data: ScreenItemResponse) => dispatch({ type: ScreenEventTypes.UPDATE, payload: data.item }),
    [dispatch],
  )
  const request = useShowScreen()

  useApiEffectHandler<ScreenItemResponse>({
    data: request.data,
    error: request.error,
    responseHandler,
    successNotification,
  })

  return request
}
