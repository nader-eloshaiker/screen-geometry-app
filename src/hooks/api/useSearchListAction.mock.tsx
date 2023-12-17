import * as SearchListActionModule from '@hooks/api/useSearchListAction'
import { DataBaseEntry } from '@models/Database'
import { QueryKey, UseQueryResult } from '@tanstack/react-query'

export const useSearchListActionMock = (value?: DataBaseEntry[]) => {
  const searchListResponse: DataBaseEntry[] = value ?? [
    {
      name: 'WQHD',
      size: 34,
      width: 3440,
      height: 1440,
      aspectRatio: '21:9',
    },
    {
      name: 'WQHD+',
      size: 38,
      width: 3840,
      height: 1600,
      aspectRatio: '21:9',
    },
    {
      name: '4K UHD',
      size: 27,
      width: 3840,
      height: 2160,
      aspectRatio: '16:9',
    },
    {
      name: '4K UHD',
      size: 32,
      width: 3840,
      height: 2160,
      aspectRatio: '16:9',
    },
  ]

  return vi.spyOn(SearchListActionModule, 'useSearchListAction').mockReturnValue({
    data: searchListResponse,
    isFetching: false,
    error: undefined,
  } as UseQueryResult<unknown, unknown> & { queryKey: QueryKey })
}
