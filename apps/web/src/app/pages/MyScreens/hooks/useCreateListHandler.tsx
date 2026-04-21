import { defaultScreenInputList } from '@/app/constants/defaultScreenList'
import { useCreateScreenListEffect } from '@/app/hooks/api/useCreateScreenListEffect'
import { queryClient } from '@/app/stores/query/QueryClient'
import { getGetScreenListQueryKey, useCreateScreenList } from '@screengeometry/lib-api/spec'
import { useCallback } from 'react'
import ReactGA from 'react-ga4'

export type CreateListHandler = Omit<ReturnType<typeof useCreateScreenList>, 'mutate'> & { onAction: () => void }

export const useCreateListhandler = (): CreateListHandler => {
  const query = useCreateScreenList({
    mutation: {
      // invalidate getGetScreenListQueryKey to force refetch
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getGetScreenListQueryKey() }),
    },
  })
  const { mutate, ...params } = query

  useCreateScreenListEffect(params.data, params.error)

  const onAction = useCallback(() => {
    ReactGA.event({
      category: 'Button Click',
      action: 'Clicked load default list',
      label: 'Screens Page',
    })
    mutate({ data: defaultScreenInputList })
  }, [mutate])

  return { ...params, onAction }
}
