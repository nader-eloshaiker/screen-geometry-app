import { ScreenEventTypes } from '@app/contexts/Screen/ScreenManager'
import { useScreenContext } from '@app/contexts/Screen/useScreenContext'
import { ScreenItemResponse, useCreateScreen } from '@packages/openapi/generated'
import { useCallback } from 'react'
import { useApiEffectHandler } from '../useApiEffectHandler'

const successNotification = { title: 'Created', message: 'Screen configuration' }

export const useCreateScreenApi = () => {
  const { dispatch } = useScreenContext()
  const responseHandler = useCallback(
    (data: ScreenItemResponse) => dispatch({ type: ScreenEventTypes.ADD, payload: data?.item }),
    [dispatch],
  )
  const request = useCreateScreen()

  useApiEffectHandler<ScreenItemResponse>({
    data: request.data,
    error: request.error,
    responseHandler,
    successNotification,
  })

  return request
}
