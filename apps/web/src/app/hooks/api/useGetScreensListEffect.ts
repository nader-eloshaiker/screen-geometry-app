import { ScreenEventTypes } from '@/app/hooks/screen/ScreenManager'
import { useScreenContext } from '@/app/hooks/screen/useScreenContext'
import { ErrorResponse, ScreenListResponse } from '@screengeometry/lib-api/spec'
import { useCallback } from 'react'
import { useApiEffect } from './useApiEffect'

export const useGetScreensListEffect = (data: ScreenListResponse | undefined, error: ErrorResponse | null) => {
  const { dispatch } = useScreenContext()
  const responseHandler = useCallback(
    (data: ScreenListResponse) => dispatch({ type: ScreenEventTypes.LOAD, payload: data?.list }),
    [dispatch]
  )

  useApiEffect<ScreenListResponse>({
    data,
    error,
    responseHandler,
  })
}
