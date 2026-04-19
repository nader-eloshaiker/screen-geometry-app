import { ScreenEvent } from '@/app/stores/screen/ScreenManager'
import { useScreenContext } from '@/app/stores/screen/useScreenContext'
import { useTranslation } from '@/app/stores/translation'
import type { ErrorResponse, ScreenListResponse } from '@screengeometry/lib-api/spec'
import { useCallback, useMemo } from 'react'
import { useApiEffect } from './useApiEffect'

export const useCreateScreenListEffect = (data: ScreenListResponse | undefined, error: ErrorResponse | null) => {
  const { dispatch } = useScreenContext()
  const responseHandler = useCallback(
    (data: ScreenListResponse) => dispatch({ type: ScreenEvent.load, payload: data.list }),
    [dispatch]
  )

  const { formatMessage } = useTranslation()
  const successNotification = useMemo(
    () => ({
      title: formatMessage('api.created.title'),
      message: formatMessage('api.createScreenList.successNotification.message'),
    }),
    [formatMessage]
  )

  useApiEffect<ScreenListResponse>({
    data,
    error,
    responseHandler,
    successNotification,
  })
}
