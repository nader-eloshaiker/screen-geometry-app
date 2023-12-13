import { useCallback } from 'react'
import { SearchActionTypes } from '../../contexts/Search/SearchManager'
import { useSearchContext } from '../../contexts/Search/useSearchContext'
import { DataBaseEntry } from '../../models/Database'
import { useAppQuery } from '../fetch/useAppQuery'
import { useSearchListAction } from './useSearchListAction'

export const useSearchList = (enabled: boolean) => {
  const { dispatch } = useSearchContext()

  const callback = useCallback(
    (data: Array<DataBaseEntry>) => dispatch({ type: SearchActionTypes.LOAD, payload: data }),
    [dispatch],
  )
  const useRequest = () =>
    useSearchListAction({
      query: { enabled, staleTime: Infinity, queryKey: ['useListSearchItems'] },
    })

  return useAppQuery<Array<DataBaseEntry>>({
    useRequest,
    callback,
  })
}
