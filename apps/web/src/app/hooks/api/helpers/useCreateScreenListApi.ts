import { ScreenEventTypes } from '@/app/hooks/screen/ScreenManager'
import { useScreenContext } from '@/app/hooks/screen/useScreenContext'
import { ScreenListResponse, useCreateScreenList } from '@screengeometry/lib-api/spec'
import { useCallback, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useApiEffectHandler } from '../useApiEffectHandler'

export const useCreateScreenListApi = () => {
  const { dispatch } = useScreenContext()
  const responseHandler = useCallback(
    (data: ScreenListResponse) => dispatch({ type: ScreenEventTypes.ADD_LIST, payload: data.list }),
    [dispatch]
  )
  const request = useCreateScreenList()

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

  useApiEffectHandler<ScreenListResponse>({
    data: request.data,
    error: request.error,
    responseHandler,
    successNotification,
  })

  return request
}
