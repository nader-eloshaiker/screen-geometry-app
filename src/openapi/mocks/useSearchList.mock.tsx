import { searchFixtures } from '@openapi/fixtures/SearchFixtures'
import { SearchItem, SearchListResponse } from '@openapi/generated/models'
import * as ScreenSearchListModule from '@openapi/generated/services/search-list-service'

export type SearchListActionMock = ReturnType<typeof useSearchListActionMock>

export const useSearchListActionMock = (value?: SearchItem[]) => {
  const searchListResponse: SearchListResponse = { list: value ?? searchFixtures }

  const spy = vi.spyOn(ScreenSearchListModule, 'useGetSearchList').mockReturnValue({
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
