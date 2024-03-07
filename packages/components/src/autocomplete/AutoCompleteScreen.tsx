import { SearchListResponse, SearchScreenItem, useGetSearch } from '@screengeometry/openapi'
import { transformSearchData } from '@screengeometry/utils'
import { useCallback, useEffect, useState } from 'react'
import ListInputField, { TListItem } from '../listinputfield/ListInputField'

type UseGetSearch = typeof useGetSearch<SearchListResponse>

type TProps = TRestProps & {
  onSelectScreen: (item: SearchScreenItem) => void
  setClearSearchHandler?: (func: () => void) => void
  useSearchApi?: UseGetSearch
}

export const AutoCompleteScreen = ({
  onSelectScreen = () => {},
  setClearSearchHandler = () => {},
  useSearchApi = () => ({ data: undefined, isFetching: false }) as ReturnType<UseGetSearch>,
  ...rest
}: TProps) => {
  const [clearHandler, setClearHandler] = useState<() => void>(() => {})
  const [list, setList] = useState<Array<TListItem>>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  const { isFetching, data }: ReturnType<UseGetSearch> = useSearchApi({ term: searchTerm })

  const handleSelect = (value: TListItem) => {
    if (!value) {
      return
    }

    const match = data?.list.find((entry) => entry.id === value.id)
    if (match) {
      const screen = transformSearchData(match)
      onSelectScreen(screen)
    }
  }

  const handleResetSearch = useCallback(() => {
    clearHandler()
  }, [clearHandler])

  useEffect(() => {
    if (!setClearSearchHandler || !handleResetSearch) {
      return
    }

    setClearSearchHandler(() => handleResetSearch)
  }, [setClearSearchHandler, handleResetSearch])

  useEffect(() => {
    const newResponse = data?.list ?? []
    const newList = newResponse.map(({ id, label }) => ({ id, label }))

    setList(newList)
  }, [data?.list])

  // use the common auto complete component here.
  return (
    <ListInputField
      items={list}
      onChange={setSearchTerm}
      onSelect={handleSelect}
      setClearHandler={setClearHandler}
      placeholder='Type to filter list...'
      isLoading={isFetching}
      disableOnLoading={false}
      {...rest}
    />
  )
}
