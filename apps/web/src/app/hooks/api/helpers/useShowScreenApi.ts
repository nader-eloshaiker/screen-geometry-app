import { ScreenEventTypes } from '@/app/hooks/screen/ScreenManager'
import { useScreenContext } from '@/app/hooks/screen/useScreenContext'
import { ScreenItemResponse, useShowScreen } from '@screengeometry/lib-api/spec'
import { useCallback } from 'react'
import { useApiEffectHandler } from '../useApiEffectHandler'

const notification = { title: 'Updated', message: 'Screen visibility has been updated' }

export const useShowScreenApi = () => {
  const { dispatch } = useScreenContext()
  const responseHandler = useCallback(
    (data: ScreenItemResponse) => {
      dispatch({ type: ScreenEventTypes.UPDATE, payload: data.item })
    },
    [dispatch]
  )
  const request = useShowScreen()

  useApiEffectHandler<ScreenItemResponse>({
    data: request.data,
    error: request.error,
    responseHandler,
    successNotification: notification,
  })

  return request
}
