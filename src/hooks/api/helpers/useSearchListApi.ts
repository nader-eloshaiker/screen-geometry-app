import { SearchActionTypes } from '@contexts/Search/SearchManager'
import { useSearchContext } from '@contexts/Search/useSearchContext'
import { DataBaseEntry } from '@models/Database'
import { useCallback } from 'react'
import { useSearchList } from '../../../openapi/augmented/useSearchList'
import { useApiQuery } from '../useApiQuery'

export const useSearchListApi = (enabled: boolean) => {
  const { dispatch } = useSearchContext()

  const responseHandler = useCallback(
    (data: Array<DataBaseEntry>) => dispatch({ type: SearchActionTypes.LOAD, payload: data }),
    [dispatch],
  )
  const useRequest = () =>
    useSearchList({
      query: { enabled, staleTime: Infinity, queryKey: ['useListSearchItems'] },
    })

  return useApiQuery<Array<DataBaseEntry>>({
    useRequest,
    responseHandler,
  })
}
