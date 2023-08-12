import { useReducer } from 'react'
import { IDabaseState, SearchContext, initialDatabaseState } from './SearchContext'

import { IDataBaseEntry } from '../../models/Database'
import { transformSearchData } from '../../utils/ScreenTransformation'

export enum SearchActionTypes {
  LOAD = 'load',
  SEARCH = 'search',
  RESET = 'reset',
}

export type TDatabaseAction =
  | { type: SearchActionTypes.LOAD; payload: IDataBaseEntry[] }
  | { type: SearchActionTypes.SEARCH; payload: string }
  | { type: SearchActionTypes.RESET; payload?: undefined }

export const searchReducer = (state: IDabaseState, { type, payload }: TDatabaseAction): IDabaseState => {
  switch (type) {
    case SearchActionTypes.LOAD:
      if (state.monitorData.length > 0) {
        return state
      }

      // eslint-disable-next-line no-case-declarations
      const monitorData = payload.map((item) => transformSearchData(item))

      return { ...state, monitorData, results: [...monitorData] }
    case SearchActionTypes.SEARCH:
      if (state.query === payload) {
        return state
      }

      return {
        ...state,
        query: payload,
        results:
          payload?.length > 0
            ? state.monitorData.filter((item) => item.label.toLowerCase().indexOf(payload.toLowerCase()) > -1).sort()
            : [...state.monitorData],
      }
    case SearchActionTypes.RESET:
      if (state.query === '') {
        return state
      }

      return { ...state, query: '', results: [...state.monitorData] }
    default:
      return state
  }
}

export const SearchProvider = ({ children }: TReactChildren) => {
  const [database, dispatch] = useReducer(searchReducer, initialDatabaseState)

  return database ? <SearchContext.Provider value={[database, dispatch]}>{children}</SearchContext.Provider> : null
}
