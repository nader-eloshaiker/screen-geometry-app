import { useEffect, useState } from 'react'
import { SearchActionTypes } from '../../contexts/Search/SearchManager'
import { useSearchContext } from '../../contexts/Search/useSearchContext'
import { useSearchList } from '../../hooks/api/useSearchList'
import { SearchItem } from '../../models/Database'
import AutoComplete, { TAutoCompleteItem } from './Autocomplete'

type TProps = TRestProps & {
  onSelect: (item: SearchItem) => void
  searchValue: string
  setSearchValue: (value: string) => void
}

export const AutoCompleteScreen = ({ onSelect, searchValue, setSearchValue, ...rest }: TProps) => {
  // user selected item
  const [selected, setSelected] = useState<TAutoCompleteItem>()

  // a list to show on the dropdown when user types
  const [items, setItems] = useState<Array<TAutoCompleteItem>>([])

  const { state: db, dispatch: dispatchSearch } = useSearchContext()

  const { isSearchListLoading, searchListResponse } = useSearchList({
    query: { enabled: db.monitorData.length === 0, staleTime: Infinity, queryKey: ['useListSearchItems'] },
  })

  useEffect(() => {
    if (searchListResponse) {
      dispatchSearch({ type: SearchActionTypes.LOAD, payload: searchListResponse })
    }
  }, [dispatchSearch, searchListResponse])

  useEffect(() => {
    dispatchSearch({ type: SearchActionTypes.SEARCH, payload: searchValue })
  }, [dispatchSearch, searchValue])

  useEffect(() => {
    const dbEntry = selected && db.monitorData.find((item) => item.id === selected.id)
    if (dbEntry) {
      onSelect(dbEntry)
    }
  }, [db.monitorData, onSelect, selected])

  useEffect(() => {
    setItems(db.results.map((p) => ({ id: p.id, label: p.label })))
  }, [db.results])

  // use the common auto complete component here.
  return (
    <AutoComplete
      items={items}
      value={searchValue}
      onChange={setSearchValue}
      onSelect={setSelected}
      placeholder='Type to filter list...'
      isLoading={isSearchListLoading}
      {...rest}
    />
  )
}
