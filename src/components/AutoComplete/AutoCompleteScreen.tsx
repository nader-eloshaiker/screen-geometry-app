import { SearchActionTypes } from '@contexts/Search/SearchManager'
import { useSearchContext } from '@contexts/Search/useSearchContext'
import { useSearchListApi } from '@hooks/api/helpers/useSearchListApi'
import { SearchItem } from '@models/Database'
import { useEffect, useState } from 'react'
import ListInputField, { TListItem } from '../ListInputFIeld/ListInputField'

type TProps = TRestProps & {
  onSelect: (item: SearchItem) => void
  onReset: string
}

export const AutoCompleteScreen = ({ onSelect, onReset, ...rest }: TProps) => {
  const [searchValue, setSearchValue] = useState('')
  const [selected, setSelected] = useState<TListItem>()

  // a list to show on the dropdown when user types
  const [items, setItems] = useState<Array<TListItem>>([])

  const { state: db, dispatch: dispatchSearch } = useSearchContext()

  const { isFetching: isSearchListLoading, data: searchListResponse } = useSearchListApi(db.monitorData.length === 0)

  useEffect(() => {
    if (searchListResponse) {
      dispatchSearch({ type: SearchActionTypes.LOAD, payload: searchListResponse })
    }
  }, [dispatchSearch, searchListResponse])

  useEffect(() => {
    dispatchSearch({ type: SearchActionTypes.SEARCH, payload: searchValue })
  }, [dispatchSearch, searchValue])

  useEffect(() => {
    setSearchValue(onReset)
  }, [dispatchSearch, onReset])

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
    <ListInputField
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
