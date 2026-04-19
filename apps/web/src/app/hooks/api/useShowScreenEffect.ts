import { ScreenEvent } from '@/app/stores/screen/ScreenManager'
import { useScreenContext } from '@/app/stores/screen/useScreenContext'
import { useTranslation } from '@/app/stores/translation'
import type { ErrorResponse, ScreenItemResponse } from '@screengeometry/lib-api/spec'
import { useCallback, useMemo } from 'react'
import { useApiEffect } from './useApiEffect'

export const useShowScreenEffect = (data: ScreenItemResponse | undefined, error: ErrorResponse | null) => {
  const { dispatch } = useScreenContext()
  const responseHandler = useCallback(
    (data: ScreenItemResponse) => {
      dispatch({ type: ScreenEvent.update, payload: data.item })
    },
    [dispatch]
  )
  const { formatMessage } = useTranslation()
  const successNotification = useMemo(
    () => ({
      title: formatMessage('api.updated.title'),
      message: formatMessage('api.showScreen.successNotification.message'),
    }),
    [formatMessage]
  )

  useApiEffect<ScreenItemResponse>({
    data,
    error,
    responseHandler,
    successNotification,
  })
}
