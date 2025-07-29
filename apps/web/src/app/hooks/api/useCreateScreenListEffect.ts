import { ScreenEventTypes } from '@/app/hooks/screen/ScreenManager'
import { useScreenContext } from '@/app/hooks/screen/useScreenContext'
import { ErrorResponse, ScreenListResponse } from '@screengeometry/lib-api/spec'
import { useCallback, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useApiEffect } from './useApiEffect'

export const useCreateScreenListEffect = (data: ScreenListResponse | undefined, error: ErrorResponse | null) => {
  const { dispatch } = useScreenContext()
  const responseHandler = useCallback(
    (data: ScreenListResponse) => dispatch({ type: ScreenEventTypes.ADD_LIST, payload: data.list }),
    [dispatch]
  )

  const { formatMessage } = useIntl()
  const successNotification = useMemo(
    () => ({
      title: formatMessage({ id: 'api.created.title', defaultMessage: 'Created' }),
      message: formatMessage({
        id: 'api.createScreenList.successNotification.message',
        defaultMessage: 'A list of common Screen specifications has been generated',
      }),
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
