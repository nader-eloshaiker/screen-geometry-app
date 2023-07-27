import { createContext, Dispatch, useReducer } from 'react'

import { createSearchData } from '../components/utils/Screen'
import { IDataBaseEntry, ISearchData } from '../models/Database'

export enum SearchActionTypes {
  LOAD = 'load',
  SEARCH = 'search',
  RESET = 'reset',
}

export type TDatabaseAction =
  | { type: SearchActionTypes.LOAD; payload: IDataBaseEntry[] }
  | { type: SearchActionTypes.SEARCH; payload: string }
  | { type: SearchActionTypes.RESET; payload: undefined }

const initialDatabaseState = {
  monitorData: [] as ISearchData[],
  results: [] as ISearchData[],
}

type IDabaseState = typeof initialDatabaseState

const searchReducer = (state: IDabaseState, { type, payload }: TDatabaseAction): IDabaseState => {
  switch (type) {
    case SearchActionTypes.LOAD:
      return { monitorData: payload.map((item) => createSearchData(item)), results: [] }
    case SearchActionTypes.SEARCH:
      return { ...state, results: state.monitorData.filter((item) => item.id.includes(payload)) }
    case SearchActionTypes.RESET:
      return { ...state, results: [] }
    default:
      return state
  }
}

export const SearchContext = createContext<[IDabaseState, Dispatch<TDatabaseAction>]>([initialDatabaseState, () => {}])

export const SearchProvider = ({ children }: TReactChildren) => {
  const [database, dispatch] = useReducer(searchReducer, initialDatabaseState)

  return database ? <SearchContext.Provider value={[database, dispatch]}>{children}</SearchContext.Provider> : null
}
