import { ScreenEvent } from '@/app/stores/screen/ScreenManager'
import { useScreenContext } from '@/app/stores/screen/useScreenContext'
import { useTranslation } from '@/app/stores/translation'
import type { ScreenIdResponse, useDeleteScreen } from '@screengeometry/lib-api/spec'
import { useCallback, useEffect, useMemo } from 'react'
import ReactGA from 'react-ga4'
import { useApiEffect } from './useApiEffect'

export const useDeleteScreenEffect = ({ data, error, isPending }: ReturnType<typeof useDeleteScreen>) => {
  const { dispatch } = useScreenContext()
  const responseHandler = useCallback(
    (data: ScreenIdResponse) => dispatch({ type: ScreenEvent.delete, payload: data.id }),
    [dispatch]
  )
  const { formatMessage } = useTranslation()
  const successNotification = useMemo(
    () => ({
      title: formatMessage('api.deleted.title'),
      message: formatMessage('api.deleteScreen.successNotification.message'),
    }),
    [formatMessage]
  )

  useEffect(() => {
    if (isPending) {
      ReactGA.event({
        category: 'Button Click',
        action: 'Clicked delete',
        label: 'My Screens Page',
      })
    }
  }, [isPending])

  useApiEffect<ScreenIdResponse>({
    data,
    error,
    responseHandler,
    successNotification,
  })
}
