import { ScreenActionTypes } from '@contexts/Screen/ScreenManager'
import { useScreenContext } from '@contexts/Screen/useScreenContext'
import { ScreenListResponse } from '@openapi/generated/models'
import { useGetScreenList } from '@openapi/generated/services/screen-list-service'
import { keepPreviousData } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useApiQuery } from '../useApiQuery'

export const useGetScreensListApi = () => {
  const { dispatch } = useScreenContext()
  const apiCallback = useCallback(
    (data: ScreenListResponse) => dispatch({ type: ScreenActionTypes.LOAD, payload: data?.list }),
    [dispatch],
  )
  const useApiRequest = () =>
    useGetScreenList({
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
