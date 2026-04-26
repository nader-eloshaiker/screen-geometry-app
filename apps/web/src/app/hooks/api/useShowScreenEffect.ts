import { ScreenEvent } from '@/app/stores/screen/ScreenManager'
import { useScreenContext } from '@/app/stores/screen/useScreenContext'
import { useTranslation } from '@/app/stores/translation'
import type { ScreenItemResponse, useShowScreen } from '@screengeometry/lib-api/spec'
import { useCallback, useEffect, useMemo } from 'react'
import ReactGA from 'react-ga4'
import { useApiEffect } from './useApiEffect'

export const useShowScreenEffect = ({ data, error, isPending }: ReturnType<typeof useShowScreen>) => {
  const { dispatch } = useScreenContext()
  const responseHandler = useCallback(
    (data: ScreenItemResponse) => {
      dispatch({ type: ScreenEvent.update, payload: data.item })
    },
    [dispatch]
  )
  const { formatMessage } = useTranslation()
  const successNotification = useMemo(
    () => ({
      title: formatMessage('api.updated.title'),
      message: formatMessage('api.showScreen.successNotification.message'),
    }),
    [formatMessage]
  )

  useEffect(() => {
    if (isPending) {
      ReactGA.event({
        category: 'Checkbox Click',
        action: 'Clicked show',
        label: 'My Screens Page',
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
