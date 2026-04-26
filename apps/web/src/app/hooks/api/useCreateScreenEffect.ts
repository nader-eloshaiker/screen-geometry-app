import { ScreenEvent } from '@/app/stores/screen/ScreenManager'
import { useScreenContext } from '@/app/stores/screen/useScreenContext'
import { useTranslation } from '@/app/stores/translation'
import type { ScreenItemResponse, useCreateScreen } from '@screengeometry/lib-api/spec'
import { useCallback, useEffect, useMemo } from 'react'
import ReactGA from 'react-ga4'
import { useApiEffect } from './useApiEffect'

export const useCreateScreenEffect = ({ data, error, isPending }: ReturnType<typeof useCreateScreen>) => {
  const { dispatch } = useScreenContext()
  const responseHandler = useCallback(
    (data: ScreenItemResponse) => dispatch({ type: ScreenEvent.add, payload: data?.item }),
    [dispatch]
  )

  const { formatMessage } = useTranslation()
  const successNotification = useMemo(
    () => ({
      title: formatMessage('api.created.title'),
      message: formatMessage('api.createScreen.successNotification.message'),
    }),
    [formatMessage]
  )

  useEffect(() => {
    if (isPending) {
      ReactGA.event({
        category: 'Submit Button Click',
        action: 'Submited Create Screen Button',
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
