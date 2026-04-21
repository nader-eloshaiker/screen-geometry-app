import { useShowScreenEffect } from '@/app/hooks/api/useShowScreenEffect'
import { queryClient } from '@/app/stores/query/QueryClient'
import { getGetScreenListQueryKey, useShowScreen } from '@screengeometry/lib-api/spec'
import { useCallback } from 'react'
import ReactGA from 'react-ga4'

export type ShowHandler = Omit<ReturnType<typeof useShowScreen>, 'mutate'> & {
  onAction: (id: string) => void
}

export const useShowHandler = (): ShowHandler => {
  const query = useShowScreen({
    mutation: {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getGetScreenListQueryKey() }),
    },
  })
  const { mutate, ...params } = query

  useShowScreenEffect(params.data, params.error)

  const onAction = useCallback(
    (id: string) => {
      ReactGA.event({
        category: 'Checkbox Click',
        action: 'Clicked show',
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
