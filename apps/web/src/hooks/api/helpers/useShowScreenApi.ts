import { ScreenActionTypes } from '@contexts/Screen/ScreenManager'
import { useScreenContext } from '@contexts/Screen/useScreenContext'
import { ScreenItemResponse, useShowScreen } from '@screengeometry/openapi'
import { useCallback } from 'react'
import { useApiEffectHandler } from '../useApiEffectHandler'

const successNotification = { title: 'Updated', message: 'Screen visibility' }

export const useShowScreenApi = () => {
  const { dispatch } = useScreenContext()
  const responseHandler = useCallback(
    (data: ScreenItemResponse) => dispatch({ type: ScreenActionTypes.UPDATE, payload: data.item }),
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
