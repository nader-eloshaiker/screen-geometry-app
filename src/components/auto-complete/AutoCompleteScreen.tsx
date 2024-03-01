import ListInputField, { TListItem } from '@components/list-input-fIeld/ListInputField'
import { useSearchApi } from '@hooks/api/helpers/useSearchApi'
import { SearchScreenItem } from '@screengeometry/openapi'
import { transformSearchData } from '@screengeometry/utils'
import { useCallback, useEffect, useState } from 'react'

type TProps = TRestProps & {
  onSelectScreen: (item: SearchScreenItem) => void
  setClearSearchHandler?: (func: () => void) => void
}

export const AutoCompleteScreen = ({
  onSelectScreen = () => {},
  setClearSearchHandler = () => {},
  ...rest
}: TProps) => {
  const [clearHandler, setClearHandler] = useState<() => void>(() => {})
  const [list, setList] = useState<Array<TListItem>>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  const { isFetching: isSearchListLoading, data: searchListResponse } = useSearchApi({ term: searchTerm })

  const handleSelect = (value: TListItem) => {
    if (!value) {
      return
    }

    const match = searchListResponse?.list.find((entry) => entry.id === value.id)
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
    const newResponse = searchListResponse?.list ?? []
    const newList = newResponse.map(({ id, label }) => ({ id, label }))

    setList(newList)
  }, [searchListResponse])

  // use the common auto complete component here.
  return (
    <ListInputField
      items={list}
      onChange={setSearchTerm}
      onSelect={handleSelect}
      setClearHandler={setClearHandler}
      placeholder='Type to filter list...'
      isLoading={isSearchListLoading}
      disableOnLoading={false}
      {...rest}
    />
  )
}
