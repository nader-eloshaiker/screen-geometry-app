import { ScreenEvent } from '@/app/stores/screen/ScreenManager'
import { useScreenContext } from '@/app/stores/screen/useScreenContext'
import { useTranslation } from '@/app/stores/translation'
import type { ErrorResponse, ScreenListResponse } from '@screengeometry/lib-api/spec'
import { useCallback, useMemo } from 'react'
import { useApiEffect } from './useApiEffect'

export const useUpdateScreenListEffect = (data: ScreenListResponse | undefined, error: ErrorResponse | null) => {
  const { dispatch } = useScreenContext()
  const responseHandler = useCallback(
    (data: ScreenListResponse) => dispatch({ type: ScreenEvent.updateList, payload: data.list }),
    [dispatch]
  )

  const { formatMessage } = useTranslation()
  const successNotification = useMemo(
    () => ({
      title: formatMessage('api.updatedList.title'),
      message: formatMessage('api.updateScreenList.successNotification.message'),
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
