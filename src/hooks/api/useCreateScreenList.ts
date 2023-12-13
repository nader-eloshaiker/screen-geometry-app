import { useCallback } from 'react'
import { ScreenActionTypes } from '../../contexts/Screen/ScreenManager'
import { useScreenContext } from '../../contexts/Screen/useScreenContext'
import { ScreenInputList, ScreenListResponse } from '../../generated/openapi/models'
import { useCreateScreenListAction } from '../../generated/openapi/services/screen-list-service'
import { useAppMutation } from '../fetch/useAppMutation'

const success = { title: 'Created', message: 'Screen list' }

export const useCreateScreenList = () => {
  const { dispatch } = useScreenContext()
  const callback = useCallback(
    (data: ScreenListResponse) => dispatch({ type: ScreenActionTypes.ADD_LIST, payload: data.list }),
    [dispatch],
  )
  const useRequest = () => useCreateScreenListAction()

  return useAppMutation<ScreenListResponse, { data: ScreenInputList }>({
    useRequest,
    callback,
    success,
  })
}
