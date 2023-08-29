import { useEffect, useState } from 'react'
import useAxios from '../../api/fetch/useAxios'
import { SearchActionTypes } from '../../contexts/Search/SearchManager'
import { useSearchContext } from '../../contexts/Search/useSearchContext'
import { DataBaseEntry, SearchItem } from '../../models/Database'
import Autocomplete, { TAutoCompleteItem } from './Autocomplete'

type TProps = TRestProps & {
  onSelect: (item: SearchItem) => void
}

const AutoCompleteScreen = ({ onSelect, ...rest }: TProps) => {
  // query typed by user
  const [val, setVal] = useState('')

  // user selected item
  const [selected, setSelected] = useState<TAutoCompleteItem>()

  // a list to show on the dropdown when user types
  const [items, setItems] = useState<Array<TAutoCompleteItem>>([])

  const [db, dispatchSearch] = useSearchContext()

  const { response, loading } = useAxios<DataBaseEntry[]>({
    params: { url: 'db/monitor.json' },
    options: { skip: db.monitorData.length > 0 },
  })

  useEffect(() => {
    if (response) {
      dispatchSearch({ type: SearchActionTypes.LOAD, payload: response.data })
    }
  }, [response])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const url = 'db/monitor.json'
  //     try {
  //       setIsLoading(true)

  //       const response = await fetch(url)
  //       const dbEntries = (await response.json()) as DataBaseEntry[]

  //       dispatchSearch({ type: SearchActionTypes.LOAD, payload: dbEntries })
  //     } catch (error) {
  //       // fail quitely as it is not a big deal, autocomplete will not work
  //       dispatchSearch({ type: SearchActionTypes.RESET })
  //       console.error(`Unable to fetch screen DB ${url} :: `, error)
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }

  //   if (db.monitorData.length === 0) {
  //     fetchData()
  //   }
  // }, [db])

  useEffect(() => {
    dispatchSearch({ type: SearchActionTypes.SEARCH, payload: val })
  }, [val])

  useEffect(() => {
    const dbEntry = selected && db.monitorData.find((item) => item.id === selected.id)
    if (dbEntry) {
      onSelect(dbEntry)
    }
  }, [selected])

  useEffect(() => {
    setItems(db.results.map((p) => ({ id: p.id, label: p.label })))
  }, [db.results])

  // use the common auto complete component here.
  return (
    <Autocomplete
      items={items}
      value={val}
      onChange={setVal}
      onSelect={setSelected}
      placeholder='Type to filter list...'
      isLoading={loading}
      {...rest}
    />
  )
}

export default AutoCompleteScreen
