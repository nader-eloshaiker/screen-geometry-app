import { useDeleteScreenEffect } from '@/app/hooks/api/useDeleteScreenEffect'
import { queryClient } from '@/app/stores/query/QueryClient'
import { getGetScreenListQueryKey, useDeleteScreen } from '@screengeometry/lib-api/spec'
import { useCallback } from 'react'
import ReactGA from 'react-ga4'

export const useDeleteHandler = () => {
  const query = useDeleteScreen({
    mutation: {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getGetScreenListQueryKey() }),
    },
  })
  const { mutate, ...params } = query

  useDeleteScreenEffect(params.data, params.error)

  const onAction = useCallback(
    (id: string) => {
      ReactGA.event({
        category: 'Button Click',
        action: 'Clicked delete',
        label: 'My Screens Page',
      })

      mutate({ id })
    },
    [mutate]
  )

  return {
    ...params,
    onAction,
  }
}
