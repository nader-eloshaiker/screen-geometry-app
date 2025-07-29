import { ScreenEventTypes } from '@/app/hooks/screen/ScreenManager'
import { useScreenContext } from '@/app/hooks/screen/useScreenContext'
import { ScreenIdResponse, useDeleteScreen } from '@screengeometry/lib-api/spec'
import { useCallback, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useApiEffectHandler } from '../useApiEffectHandler'

export const useDeleteScreenApi = () => {
  const { dispatch } = useScreenContext()
  const responseHandler = useCallback(
    (data: ScreenIdResponse) => dispatch({ type: ScreenEventTypes.DELETE, payload: data.id }),
    [dispatch]
  )
  const request = useDeleteScreen()

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

  useApiEffectHandler<ScreenIdResponse>({
    data: request.data,
    error: request.error,
    responseHandler,
    successNotification,
  })

  return request
}
