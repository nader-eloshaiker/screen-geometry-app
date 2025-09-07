import { ScreenEvent } from '@/app/stores/screen/ScreenManager'
import { useScreenContext } from '@/app/stores/screen/useScreenContext'
import type { ErrorResponse, ScreenIdResponse } from '@screengeometry/lib-api/spec'
import { useCallback, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useApiEffect } from './useApiEffect'

export const useDeleteScreenEffect = (data: ScreenIdResponse | undefined, error: ErrorResponse | null) => {
  const { dispatch } = useScreenContext()
  const responseHandler = useCallback(
    (data: ScreenIdResponse) => dispatch({ type: ScreenEvent.delete, payload: data.id }),
    [dispatch]
  )
  const { formatMessage } = useIntl()
  const successNotification = useMemo(
    () => ({
      title: formatMessage({ id: 'api.deleted.title', defaultMessage: 'Deleted' }),
      message: formatMessage({
        id: 'api.deleteScreen.successNotification.message',
        defaultMessage: 'Screen specifications have been deleted',
      }),
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
