import { ScreenEventTypes } from '@/app/hooks/screen/ScreenManager'
import { useScreenContext } from '@/app/hooks/screen/useScreenContext'
import { ScreenItemResponse, useCreateScreen } from '@screengeometry/lib-api/spec'
import { useCallback, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useApiEffectHandler } from '../useApiEffectHandler'

export const useCreateScreenApi = () => {
  const { dispatch } = useScreenContext()
  const responseHandler = useCallback(
    (data: ScreenItemResponse) => dispatch({ type: ScreenEventTypes.ADD, payload: data?.item }),
    [dispatch]
  )
  const request = useCreateScreen()

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

  useApiEffectHandler<ScreenItemResponse>({
    data: request.data,
    error: request.error,
    responseHandler,
    successNotification,
  })

  return request
}
