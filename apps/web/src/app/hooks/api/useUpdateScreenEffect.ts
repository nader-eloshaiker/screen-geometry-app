import { ScreenEvent } from '@/app/stores/screen/ScreenManager'
import { useScreenContext } from '@/app/stores/screen/useScreenContext'
import { useTranslation } from '@/app/stores/translation'
import type { ScreenItemResponse, useUpdateScreen } from '@screengeometry/lib-api/spec'
import { useCallback, useEffect, useMemo } from 'react'
import ReactGA from 'react-ga4'
import { useApiEffect } from './useApiEffect'

export const useUpdateScreenEffect = ({ data, error, isPending }: ReturnType<typeof useUpdateScreen>) => {
  const { dispatch } = useScreenContext()
  const responseHandler = useCallback(
    (data: ScreenItemResponse) => dispatch({ type: ScreenEvent.update, payload: data.item }),
    [dispatch]
  )
  const { formatMessage } = useTranslation()
  const successNotification = useMemo(
    () => ({
      title: formatMessage('api.updated.title'),
      message: formatMessage('api.updateScreen.successNotification.message'),
    }),
    [formatMessage]
  )

  useEffect(() => {
    if (isPending) {
      ReactGA.event({
        category: 'Submit Button Click',
        action: 'Submited Edit Screen Button',
        label: 'Screens Page',
      })
    }
  }, [isPending])

  useApiEffect<ScreenItemResponse>({
    data,
    error,
    responseHandler,
    successNotification,
  })
}
