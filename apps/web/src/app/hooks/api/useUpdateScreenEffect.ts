import { ScreenEventTypes } from '@/app/hooks/screen/ScreenManager'
import { useScreenContext } from '@/app/hooks/screen/useScreenContext'
import { ErrorResponse, ScreenItemResponse } from '@screengeometry/lib-api/spec'
import { useCallback, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useApiEffect } from './useApiEffect'

export const useUpdateScreenEffect = (data: ScreenItemResponse | undefined, error: ErrorResponse | null) => {
  const { dispatch } = useScreenContext()
  const responseHandler = useCallback(
    (data: ScreenItemResponse) => dispatch({ type: ScreenEventTypes.UPDATE, payload: data.item }),
    [dispatch]
  )
  const { formatMessage } = useIntl()
  const successNotification = useMemo(
    () => ({
      title: formatMessage({ id: 'api.updated.title', defaultMessage: 'Updated' }),
      message: formatMessage({
        id: 'api.updateScreen.successNotification.message',
        defaultMessage: 'Screen specifications have been updated',
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
