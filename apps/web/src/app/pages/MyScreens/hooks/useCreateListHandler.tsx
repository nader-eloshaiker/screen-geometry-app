import { defaultScreenInputList } from '@/app/constants/defaultScreenList'
import { useCreateScreenListEffect } from '@/app/hooks/api/useCreateScreenListEffect'
import { queryClient } from '@/app/stores/query/QueryClient'
import { getGetScreenListQueryKey, useCreateScreenList } from '@screengeometry/lib-api/spec'
import { useCallback } from 'react'
import ReactGA from 'react-ga4'

export const useCreateListhandler = () => {
  const query = useCreateScreenList({
    mutation: {
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
