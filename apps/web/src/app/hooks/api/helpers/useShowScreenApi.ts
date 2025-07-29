import { ScreenEventTypes } from '@/app/hooks/screen/ScreenManager'
import { useScreenContext } from '@/app/hooks/screen/useScreenContext'
import { ScreenItemResponse, useShowScreen } from '@screengeometry/lib-api/spec'
import { useCallback, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useApiEffectHandler } from '../useApiEffectHandler'

export const useShowScreenApi = () => {
  const { dispatch } = useScreenContext()
  const responseHandler = useCallback(
    (data: ScreenItemResponse) => {
      dispatch({ type: ScreenEventTypes.UPDATE, payload: data.item })
    },
    [dispatch]
  )
  const request = useShowScreen()

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

  useApiEffectHandler<ScreenItemResponse>({
    data: request.data,
    error: request.error,
    responseHandler,
    successNotification,
  })

  return request
}
