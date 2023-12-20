import { ScreenActionTypes } from '@contexts/Screen/ScreenManager'
import { useScreenContext } from '@contexts/Screen/useScreenContext'
import { ScreenInputList, ScreenListResponse } from '@openapi/generated/models'
import { useCreateScreenList } from '@openapi/generated/services/screen-list-service'
import { useCallback } from 'react'
import { useApiMutation } from '../useApiMutation'

const success = { title: 'Created', message: 'Screen list' }

export const useCreateScreenListApi = () => {
  const { dispatch } = useScreenContext()
  const apiCallback = useCallback(
    (data: ScreenListResponse) => dispatch({ type: ScreenActionTypes.ADD_LIST, payload: data.list }),
    [dispatch],
  )
  const useApiRequest = () => useCreateScreenList()

  return useApiMutation<ScreenListResponse, { data: ScreenInputList }>({
    useApiRequest,
    apiCallback,
    success,
  })
}
