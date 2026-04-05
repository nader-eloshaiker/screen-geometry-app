import { useUpdateScreenListEffect } from '@/app/hooks/api/useUpdateScreenListEffect'
import { MyScreensLocationState } from '@/app/routes/myscreens'
import { queryClient } from '@/app/stores/query/QueryClient'
import { getGetScreenListQueryKey, useUpdateScreenList } from '@screengeometry/lib-api/spec'
import { useCallback } from 'react'
import ReactGA from 'react-ga4'

export const useUpdateListHandler = () => {
  const query = useUpdateScreenList({
    mutation: {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getGetScreenListQueryKey() }),
    },
  })
  const { mutate, ...params } = query

  useUpdateScreenListEffect(params.data, params.error)

  const onAction = useCallback(
    (newScreens: NonNullable<MyScreensLocationState['screens']>) => {
      ReactGA.event({
        category: 'Button Click',
        action: 'Clicked update list with shared screens',
        label: 'My Screens Page',
      })

      const newScreenInputs = newScreens.map((screen) => ({
        diagonalSize: screen.data.diagonalSize,
        aspectRatio: screen.data.aspectRatio,
        hRes: screen.data.hRes,
        vRes: screen.data.vRes,
        lightColor: screen.color.lightColor,
        darkColor: screen.color.darkColor,
      }))

      mutate({
        data: newScreenInputs,
      })
    },
    [mutate]
  )

  return {
    ...params,
    onAction,
  }
}
