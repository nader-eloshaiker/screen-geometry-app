import { useUpdateScreenEffect } from '@/app/hooks/api/useUpdateScreenEffect'
import { queryClient } from '@/app/stores/query/QueryClient'
import {
  getGetScreenListQueryKey,
  getGetScreenQueryKey,
  ScreenInput,
  useUpdateScreen,
} from '@screengeometry/lib-api/spec'
import ReactGA from 'react-ga4'

export const useUpdateHandler = ({ handleClose }: { handleClose: () => void }) => {
  const query = useUpdateScreen({
    mutation: {
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: [getGetScreenListQueryKey(), getGetScreenQueryKey()] }),
    },
  })
  const { mutate, ...params } = query

  useUpdateScreenEffect(params.data, params.error)

  const onAction = (data: ScreenInput, id: string) => {
    ReactGA.event({
      category: 'Submit Button Click',
      action: 'Submited Edit Screen Button',
      label: 'Screens Page',
    })

    mutate({ id, data }, { onSuccess: handleClose })
  }

  return {
    ...params,
    onAction,
  }
}
