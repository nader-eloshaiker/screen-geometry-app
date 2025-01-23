import { ScreenEventTypes } from '@/app/contexts/Screen/ScreenManager'
import { useScreenContext } from '@/app/contexts/Screen/useScreenContext'
import { ScreenListResponse, useCreateScreenList } from '@/lib/openapi/generated'
import { useCallback } from 'react'
import { useApiEffectHandler } from '../useApiEffectHandler'

const successNotification = { title: 'Created', message: 'A list of common Screen specifications has been generated' }

export const useCreateScreenListApi = () => {
  const { dispatch } = useScreenContext()
  const responseHandler = useCallback(
    (data: ScreenListResponse) => dispatch({ type: ScreenEventTypes.ADD_LIST, payload: data.list }),
    [dispatch],
  )
  const request = useCreateScreenList()

  useApiEffectHandler<ScreenListResponse>({
    data: request.data,
    error: request.error,
    responseHandler,
    successNotification,
  })

  return request
}
