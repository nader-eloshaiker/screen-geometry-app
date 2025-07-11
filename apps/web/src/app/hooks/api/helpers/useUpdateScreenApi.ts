import { ScreenEventTypes } from '@/app/hooks/screen/ScreenManager'
import { useScreenContext } from '@/app/hooks/screen/useScreenContext'
import { ScreenItemResponse, useUpdateScreen } from '@screengeometry/lib-api/spec'
import { useCallback } from 'react'
import { useApiEffectHandler } from '../useApiEffectHandler'

const successNotification = { title: 'Updated', message: 'Screen specifications have been updated' }

export const useUpdateScreenApi = () => {
  const { dispatch } = useScreenContext()
  const responseHandler = useCallback(
    (data: ScreenItemResponse) => dispatch({ type: ScreenEventTypes.UPDATE, payload: data.item }),
    [dispatch]
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
