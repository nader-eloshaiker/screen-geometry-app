import { DataBaseEntry } from '@models/Database'
import * as SearchListActionModule from '@openapi/augmented/useSearchList'

export type SearchListActionMock = ReturnType<typeof useSearchListActionMock>

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

  const spy = vi.spyOn(SearchListActionModule, 'useSearchList').mockReturnValue({
    data: searchListResponse,
    refetch: vi.fn().mockReturnValue({ data: searchListResponse }),
    fetchStatus: 'idle',
    isFetching: false,
    isFetched: true,
    error: null,
    queryKey: ['searchList'],
    isError: false,
    isPending: false,
    isRefetchError: false,
    isLoadingError: false,
    isLoading: false,
    isRefetching: false,
    isFetchedAfterMount: true,
    isInitialLoading: false,
    isSuccess: true,
    isStale: false,
    isPaused: false,
    isPlaceholderData: false,
    status: 'success',
    failureCount: 0,
    errorUpdateCount: 0,
    dataUpdatedAt: 0,
    errorUpdatedAt: 0,
    failureReason: [],
  })

  return spy
}
