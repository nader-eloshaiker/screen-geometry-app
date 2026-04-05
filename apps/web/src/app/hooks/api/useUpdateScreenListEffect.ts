import { ScreenEvent } from '@/app/stores/screen/ScreenManager'
import { useScreenContext } from '@/app/stores/screen/useScreenContext'
import type { ErrorResponse, ScreenListResponse } from '@screengeometry/lib-api/spec'
import { useCallback, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useApiEffect } from './useApiEffect'

export const useUpdateScreenListEffect = (data: ScreenListResponse | undefined, error: ErrorResponse | null) => {
  const { dispatch } = useScreenContext()
  const responseHandler = useCallback(
    (data: ScreenListResponse) => dispatch({ type: ScreenEvent.updateList, payload: data.list }),
    [dispatch]
  )

  const { formatMessage } = useIntl()
  const successNotification = useMemo(
    () => ({
      title: formatMessage({ id: 'api.updatedList.title', defaultMessage: 'Updated' }),
      message: formatMessage({
        id: 'api.updateScreenList.successNotification.message',
        defaultMessage: 'The list of Screen specifications has been updated successfully.',
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
