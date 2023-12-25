import { useSearchListApi } from '@hooks/api/helpers/useSearchListApi'
import { SearchItem } from '@models/Database'
import { transformSearchData } from '@utils/ScreenTransformation'
import { useCallback, useEffect, useState } from 'react'
import ListInputField, { TListItem } from '../ListInputFIeld/ListInputField'

type TProps = TRestProps & {
  onSelectScreen: (item: SearchItem) => void
  setClearSearchHandler?: (func: () => void) => void
}

export const AutoCompleteScreen = ({
  onSelectScreen = () => {},
  setClearSearchHandler = () => {},
  ...rest
}: TProps) => {
  const [clearHandler, setClearHandler] = useState<() => void>(() => {})
  const [db, setDB] = useState<Array<SearchItem>>([])
  const [list, setList] = useState<Array<TListItem>>([])
  const [searchResults, setSearchResults] = useState<Array<TListItem>>([])

  const { isFetching: isSearchListLoading, data: searchListResponse } = useSearchListApi(db.length === 0)

  const handleChange = (value: string) => {
    if (value === '') {
      setSearchResults(list)
      return
    }

    const filter = list
      .filter((item) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1)
      .sort((a, b) => a.label.localeCompare(b.label))
    setSearchResults(filter)
  }

  // fire select event when an item is selected in the search list
  const handleSelect = (value: TListItem) => {
    if (!value) {
      return
    }

    const dbEntry = db.find((entry) => entry.id === value.id)
    if (dbEntry) {
      onSelectScreen(dbEntry)
    }
  }

  const handleResetSearch = useCallback(() => {
    setSearchResults(list)
    clearHandler()
  }, [list, clearHandler])

  useEffect(() => {
    if (!setClearSearchHandler || !handleResetSearch) {
      return
    }

    setClearSearchHandler(() => handleResetSearch)
  }, [setClearSearchHandler, handleResetSearch])

  // load the search list into the dropdown list
  useEffect(() => {
    const newResponse = searchListResponse ?? []
    const newSearch = newResponse.map((item) => transformSearchData(item))
    const newList = newSearch.map((p) => ({ id: p.id, label: p.label }))

    setDB(newSearch)
    setList(newList)
    setSearchResults(newList)
  }, [searchListResponse])

  // use the common auto complete component here.
  return (
    <ListInputField
      items={searchResults}
      onChange={handleChange}
      onSelect={handleSelect}
      setClearHandler={setClearHandler}
      placeholder='Type to filter list...'
      isLoading={isSearchListLoading}
      {...rest}
    />
  )
}
