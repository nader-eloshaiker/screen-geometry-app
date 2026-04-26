import { ScreenEvent } from '@/app/stores/screen/ScreenManager'
import { useScreenContext } from '@/app/stores/screen/useScreenContext'
import { useTranslation } from '@/app/stores/translation'
import type { ScreenListResponse, useUpdateScreenList } from '@screengeometry/lib-api/spec'
import { useCallback, useEffect, useMemo } from 'react'
import ReactGA from 'react-ga4'
import { useApiEffect } from './useApiEffect'

export const useUpdateScreenListEffect = ({ data, error, isPending }: ReturnType<typeof useUpdateScreenList>) => {
  const { dispatch } = useScreenContext()
  const responseHandler = useCallback(
    (data: ScreenListResponse) => dispatch({ type: ScreenEvent.updateList, payload: data.list }),
    [dispatch]
  )

  const { formatMessage } = useTranslation()
  const successNotification = useMemo(
    () => ({
      title: formatMessage('api.updatedList.title'),
      message: formatMessage('api.updateScreenList.successNotification.message'),
    }),
    [formatMessage]
  )

  useEffect(() => {
    if (isPending) {
      ReactGA.event({
        category: 'Button Click',
        action: 'Clicked update list with shared screens',
        label: 'My Screens Page',
      })
    }
  }, [isPending])

  useApiEffect<ScreenListResponse>({
    data,
    error,
    responseHandler,
    successNotification,
  })
}
