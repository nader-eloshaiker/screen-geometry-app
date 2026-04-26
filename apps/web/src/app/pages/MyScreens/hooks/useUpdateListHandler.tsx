import { useUpdateScreenListEffect } from '@/app/hooks/api/useUpdateScreenListEffect'
import { ScreenItemRender } from '@/app/models/screenItemRender'
import { queryClient } from '@/app/stores/query/QueryClient'
import { isScreenDataEqual } from '@screengeometry/lib-api/extended'
import { getGetScreenListQueryKey, useUpdateScreenList } from '@screengeometry/lib-api/spec'
import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export type UpdateListHandler = ReturnType<typeof useUpdateScreenList>

export const useUpdateListHandler = ({
  screens,
  incomingScreens,
  isLoading,
}: {
  screens: ScreenItemRender[]
  incomingScreens?: ScreenItemRender[]
  isLoading: boolean
}): UpdateListHandler => {
  const navigate = useNavigate()
  const query = useUpdateScreenList({
    mutation: {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getGetScreenListQueryKey() }),
    },
  })
  useUpdateScreenListEffect(query)

  useEffect(() => {
    if (!incomingScreens?.length || isLoading || query.isPending) {
      return
    }

    const missingScreens = incomingScreens.filter(
      (incoming) => !screens.some((existing) => isScreenDataEqual(existing.data, incoming))
    )

    if (missingScreens.length > 0) {
      // Clear router state immediately to prevent re-processing on refresh
      navigate({ to: '/myscreens', state: {}, replace: true })
      const newScreenInputs = missingScreens.map((screen) => ({
        diagonalSize: screen.data.diagonalSize,
        aspectRatio: screen.data.aspectRatio,
        hRes: screen.data.hRes,
        vRes: screen.data.vRes,
        lightColor: screen.color.lightColor,
        darkColor: screen.color.darkColor,
      }))
      query.mutate({ data: newScreenInputs })
    }
  }, [incomingScreens, screens, isLoading, query, navigate])

  return query
}
