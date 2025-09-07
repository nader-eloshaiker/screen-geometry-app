import { ScreenEvent } from '@/app/stores/screen/ScreenManager'
import { useScreenContext } from '@/app/stores/screen/useScreenContext'
import type { ErrorResponse, ScreenListResponse } from '@screengeometry/lib-api/spec'
import { useCallback } from 'react'
import { useApiEffect } from './useApiEffect'

export const useGetScreensListEffect = (data: ScreenListResponse | undefined, error: ErrorResponse | null) => {
  const { dispatch } = useScreenContext()
  const responseHandler = useCallback(
    (data: ScreenListResponse) => dispatch({ type: ScreenEvent.load, payload: data?.list }),
    [dispatch]
  )

  useApiEffect<ScreenListResponse>({
    data,
    error,
    responseHandler,
  })
}
