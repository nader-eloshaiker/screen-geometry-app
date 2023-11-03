import { useEffect, useState } from 'react'
import { useAxios } from '../../api/fetch/useAxios'
import { SearchActionTypes } from '../../contexts/Search/SearchManager'
import { useSearchContext } from '../../contexts/Search/useSearchContext'
import { DataBaseEntry, SearchItem } from '../../models/Database'
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

  const { response, loading } = useAxios<DataBaseEntry[]>({
    params: { url: 'db/monitor.json' },
    options: { skip: db.monitorData.length > 0 },
  })

  useEffect(() => {
    if (response) {
      dispatchSearch({ type: SearchActionTypes.LOAD, payload: response.data })
    }
  }, [dispatchSearch, response])

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
      isLoading={loading}
      {...rest}
    />
  )
}
