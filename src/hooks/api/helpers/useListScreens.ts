import { keepPreviousData } from '@tanstack/react-query'
import { useCallback } from 'react'
import { ScreenActionTypes } from '../../../contexts/Screen/ScreenManager'
import { useScreenContext } from '../../../contexts/Screen/useScreenContext'
import { ScreenListResponse } from '../../../generated/openapi/models'
import { useListScreensAction } from '../../../generated/openapi/services/screen-list-service'
import { useApiQuery } from '../useApiQuery'

export const useListScreens = () => {
  const { dispatch } = useScreenContext()
  const apiCallback = useCallback(
    (data: ScreenListResponse) => dispatch({ type: ScreenActionTypes.LOAD, payload: data?.list }),
    [dispatch],
  )
  const useApiRequest = () =>
    useListScreensAction({
      query: {
        placeholderData: keepPreviousData,
        queryKey: ['useCreateScreenList'],
      },
    })

  return useApiQuery<ScreenListResponse>({
    useApiRequest,
    apiCallback,
  })
}
