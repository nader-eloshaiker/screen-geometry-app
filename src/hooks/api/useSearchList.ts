import { useCallback } from 'react'
import { SearchActionTypes } from '../../contexts/Search/SearchManager'
import { useSearchContext } from '../../contexts/Search/useSearchContext'
import { DataBaseEntry } from '../../models/Database'
import { useApiQuery } from '../fetch/useApiQuery'
import { useSearchListAction } from './useSearchListAction'

export const useSearchList = (enabled: boolean) => {
  const { dispatch } = useSearchContext()

  const apiCallback = useCallback(
    (data: Array<DataBaseEntry>) => dispatch({ type: SearchActionTypes.LOAD, payload: data }),
    [dispatch],
  )
  const useApiRequest = () =>
    useSearchListAction({
      query: { enabled, staleTime: Infinity, queryKey: ['useListSearchItems'] },
    })

  return useApiQuery<Array<DataBaseEntry>>({
    useApiRequest,
    apiCallback,
  })
}
