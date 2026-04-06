import type { ErrorResponse, ScreenListResponse } from '@screengeometry/lib-api/spec'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useApiEffect } from './useApiEffect'

export const useCreateScreenListEffect = (data: ScreenListResponse | undefined, error: ErrorResponse | null) => {
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
    successNotification,
  })
}
