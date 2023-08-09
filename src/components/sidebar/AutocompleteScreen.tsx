import { useContext, useEffect, useState } from 'react'
import { ActionTypes } from '../../contexts/App/AppContext'
import { useAppContext } from '../../contexts/App/useAppContext'
import { SearchActionTypes, SearchContext } from '../../contexts/SearchContext'
import { IDataBaseEntry, ISearch } from '../../models/Database'
import Autocomplete, { TAutoCompleteItem } from '../elements/Autocomplete'

type TProps = {
  onSelect: (item: ISearch) => void
}

const AutocompleteScreen = ({ onSelect }: TProps) => {
  // query typed by user
  const [val, setVal] = useState('')

  // user selected item
  const [selected, setSelected] = useState<TAutoCompleteItem>()

  // a list to show on the dropdown when user types
  const [items, setItems] = useState<Array<TAutoCompleteItem>>([])

  const [db, dispatchSearch] = useContext(SearchContext)
  const [_, dispatchApp] = useAppContext()

  useEffect(() => {
    const fetchData = async () => {
      const url = 'db/monitor.json'
      try {
        dispatchApp({ type: ActionTypes.LOADING, payload: { status: true, tag: 'loadDB' } })

        const response = await fetch(url)
        const dbEntries = (await response.json()) as IDataBaseEntry[]

        dispatchSearch({ type: SearchActionTypes.LOAD, payload: dbEntries })
      } catch (error) {
        // fail quitely as it is not a big deal, autocomplete will not work
        dispatchSearch({ type: SearchActionTypes.RESET })
        console.error(`Unable to fetch screen DB ${url} :: `, error)
      } finally {
        dispatchApp({ type: ActionTypes.LOADING, payload: { status: false, tag: 'loadDB' } })
      }
    }

    if (db.monitorData.length === 0) {
      fetchData()
    }
  }, [db])

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
  return <Autocomplete items={items} value={val} onChange={setVal} onSelect={setSelected} />
}

export default AutocompleteScreen
