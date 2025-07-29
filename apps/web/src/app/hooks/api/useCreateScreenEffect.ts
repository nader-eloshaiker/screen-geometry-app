import { ScreenEventTypes } from '@/app/hooks/screen/ScreenManager'
import { useScreenContext } from '@/app/hooks/screen/useScreenContext'
import { ErrorResponse, ScreenItemResponse } from '@screengeometry/lib-api/spec'
import { useCallback, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useApiEffect } from './useApiEffect'

export const useCreateScreenEffect = (data: ScreenItemResponse | undefined, error: ErrorResponse | null) => {
  const { dispatch } = useScreenContext()
  const responseHandler = useCallback(
    (data: ScreenItemResponse) => dispatch({ type: ScreenEventTypes.ADD, payload: data?.item }),
    [dispatch]
  )

  const { formatMessage } = useIntl()
  const successNotification = useMemo(
    () => ({
      title: formatMessage({ id: 'api.created.title', defaultMessage: 'Created' }),
      message: formatMessage({
        id: 'api.createScreen.successNotification.message',
        defaultMessage: 'Screen specifications has been added to list',
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
