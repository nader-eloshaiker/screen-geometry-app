import { SearchActionTypes } from '@contexts/Search/SearchManager'
import { useSearchContext } from '@contexts/Search/useSearchContext'
import { DataBaseEntry } from '@models/Database'
import { useCallback } from 'react'
import { useSearchListAction } from '../../../openapi/augmented/useSearchListAction'
import { useApiQuery } from '../useApiQuery'

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
