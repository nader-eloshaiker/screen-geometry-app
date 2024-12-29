import { ScreenEventTypes } from '@/app/contexts/Screen/ScreenManager'
import { useScreenContext } from '@/app/contexts/Screen/useScreenContext'
import { ScreenItemResponse, useUpdateScreen } from '@/lib/openapi/generated'
import { useCallback } from 'react'
import { useApiEffectHandler } from '../useApiEffectHandler'

const successNotification = { title: 'Updated', message: 'Screen specifications have been updated' }

export const useUpdateScreenApi = () => {
  const { dispatch } = useScreenContext()
  const responseHandler = useCallback(
    (data: ScreenItemResponse) => dispatch({ type: ScreenEventTypes.UPDATE, payload: data.item }),
    [dispatch],
  )
  const request = useUpdateScreen()

  useApiEffectHandler<ScreenItemResponse>({
    data: request.data,
    error: request.error,
    responseHandler,
    successNotification,
  })

  return request
}
