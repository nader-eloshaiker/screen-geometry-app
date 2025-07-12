import { ScreenEventTypes } from '@/app/hooks/screen/ScreenManager'
import { useScreenContext } from '@/app/hooks/screen/useScreenContext'
import { ScreenListResponse, useGetScreenList } from '@screengeometry/lib-api/spec'
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
