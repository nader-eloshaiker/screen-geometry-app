import { useCreateScreenEffect } from '@/app/hooks/api/useCreateScreenEffect'
import { queryClient } from '@/app/stores/query/QueryClient'
import { getGetScreenListQueryKey, ScreenInput, useCreateScreen } from '@screengeometry/lib-api/spec'
import ReactGA from 'react-ga4'

export const useCreateHandler = ({ handleClose }: { handleClose: () => void }) => {
  const query = useCreateScreen({
    mutation: {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getGetScreenListQueryKey() }),
    },
  })
  const { mutate, ...params } = query

  useCreateScreenEffect(params.data, params.error)

  const onAction = (data: ScreenInput) => {
    ReactGA.event({
      category: 'Submit Button Click',
      action: 'Submited Create Screen Button',
      label: 'Screens Page',
    })

    mutate({ data }, { onSuccess: handleClose })
  }

  return {
    ...params,
    onAction,
  }
}
