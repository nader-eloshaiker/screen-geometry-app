import { ScreenEventTypes } from '@/app/contexts/screen/ScreenManager'
import { useScreenContext } from '@/app/contexts/screen/useScreenContext'
import { ScreenItemResponse, useCreateScreen } from '@/lib/openapi/generated'
import { useCallback } from 'react'
import { useApiEffectHandler } from '../useApiEffectHandler'

const successNotification = { title: 'Created', message: 'Screen specifications has been added to list' }

export const useCreateScreenApi = () => {
  const { dispatch } = useScreenContext()
  const responseHandler = useCallback(
    (data: ScreenItemResponse) => dispatch({ type: ScreenEventTypes.ADD, payload: data?.item }),
    [dispatch]
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
