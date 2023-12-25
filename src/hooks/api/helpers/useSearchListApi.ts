import { DataBaseEntry } from '@models/Database'
import { useSearchList } from '../../../openapi/augmented/useSearchList'
import { useApiQuery } from '../useApiQuery'

// type ActionParams = Parameters<typeof useSearchList<Array<DataBaseEntry>, ErrorResponse>>
// type QueryOptions = ActionParams[0]

export const useSearchListApi = (enabled: boolean) => {
  const useRequest = () =>
    useSearchList({
      query: { enabled, staleTime: Infinity, queryKey: ['useListSearchItems'] },
    })

  return useApiQuery<Array<DataBaseEntry>>({
    useRequest,
  })
}
