import { ScreenEventTypes } from '@/app/contexts/screen/ScreenManager'
import { useScreenContext } from '@/app/contexts/screen/useScreenContext'
import { ScreenListResponse, useGetScreenList } from '@/lib/openapi/generated'
import { keepPreviousData } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useApiEffectHandler } from '../useApiEffectHandler'

export const useGetScreensListApi = () => {
  const { dispatch } = useScreenContext()
  const responseHandler = useCallback(
    (data: ScreenListResponse) => dispatch({ type: ScreenEventTypes.LOAD, payload: data?.list }),
    [dispatch]
  )

  const request = useGetScreenList<ScreenListResponse>({
    query: {
      refetchOnWindowFocus: false,
      placeholderData: keepPreviousData,
    },
  })

  useApiEffectHandler<ScreenListResponse>({
    data: request.data,
    error: request.error,
    responseHandler,
  })

  return request
}
