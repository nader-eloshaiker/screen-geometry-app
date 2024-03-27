import { ScreenActionTypes } from '@app/contexts/Screen/ScreenManager'
import { useScreenContext } from '@app/contexts/Screen/useScreenContext'
import { ScreenItemResponse, useUpdateScreen } from '@packages/openapi/generated'
import { useCallback } from 'react'
import { useApiEffectHandler } from '../useApiEffectHandler'

const successNotification = { title: 'Updated', message: 'Screen configuration' }

export const useUpdateScreenApi = () => {
  const { dispatch } = useScreenContext()
  const responseHandler = useCallback(
    (data: ScreenItemResponse) => dispatch({ type: ScreenActionTypes.UPDATE, payload: data.item }),
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
