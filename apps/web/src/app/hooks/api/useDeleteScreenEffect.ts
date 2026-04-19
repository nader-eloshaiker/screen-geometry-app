import { ScreenEvent } from '@/app/stores/screen/ScreenManager'
import { useScreenContext } from '@/app/stores/screen/useScreenContext'
import { useTranslation } from '@/app/stores/translation'
import type { ErrorResponse, ScreenIdResponse } from '@screengeometry/lib-api/spec'
import { useCallback, useMemo } from 'react'
import { useApiEffect } from './useApiEffect'

export const useDeleteScreenEffect = (data: ScreenIdResponse | undefined, error: ErrorResponse | null) => {
  const { dispatch } = useScreenContext()
  const responseHandler = useCallback(
    (data: ScreenIdResponse) => dispatch({ type: ScreenEvent.delete, payload: data.id }),
    [dispatch]
  )
  const { formatMessage } = useTranslation()
  const successNotification = useMemo(
    () => ({
      title: formatMessage('api.deleted.title'),
      message: formatMessage('api.deleteScreen.successNotification.message'),
    }),
    [formatMessage]
  )

  useApiEffect<ScreenIdResponse>({
    data,
    error,
    responseHandler,
    successNotification,
  })
}
