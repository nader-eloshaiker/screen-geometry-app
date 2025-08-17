import { useScreenContext } from '@/app/hooks/screen/useScreenContext'
import type { ErrorResponse, ScreenItemResponse } from '@screengeometry/lib-api/spec'
import { useCallback, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { ScreenEvent } from '../screen/ScreenManager'
import { useApiEffect } from './useApiEffect'

export const useShowScreenEffect = (data: ScreenItemResponse | undefined, error: ErrorResponse | null) => {
  const { dispatch } = useScreenContext()
  const responseHandler = useCallback(
    (data: ScreenItemResponse) => {
      dispatch({ type: ScreenEvent.update, payload: data.item })
    },
    [dispatch]
  )
  const { formatMessage } = useIntl()
  const successNotification = useMemo(
    () => ({
      title: formatMessage({ id: 'api.updated.title', defaultMessage: 'Updated' }),
      message: formatMessage({
        id: 'api.showScreen.successNotification.message',
        defaultMessage: 'Screen visibility has been updated',
      }),
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
