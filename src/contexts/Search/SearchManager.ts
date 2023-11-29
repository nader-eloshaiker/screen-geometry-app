import { DataBaseEntry, SearchItem } from '../../models/Database'
import { transformSearchData } from '../../utils/ScreenTransformation'

export const initialDatabaseState = {
  monitorData: [] as SearchItem[],
  results: [] as SearchItem[],
  query: '',
}

export type DatabaseState = typeof initialDatabaseState

export enum SearchActionTypes {
  LOAD = 'load',
  SEARCH = 'search',
  RESET = 'reset',
}

export type DatabaseAction =
  | { type: SearchActionTypes.LOAD; payload: DataBaseEntry[] }
  | { type: SearchActionTypes.SEARCH; payload: string }
  | { type: SearchActionTypes.RESET; payload: undefined }

export const searchReducer = (state: DatabaseState, { type, payload }: DatabaseAction): DatabaseState => {
  switch (type) {
    case SearchActionTypes.LOAD: {
      if (state.monitorData.length > 0) {
        return state
      }

      const monitorData = payload.map((item) => transformSearchData(item))

      return { ...state, monitorData, results: [...monitorData] }
    }
    case SearchActionTypes.SEARCH: {
      if (state.query === payload) {
        return state
      }

      return {
        ...state,
        query: payload,
        results:
          payload?.length > 0
            ? state.monitorData
                .filter((item) => item.label.toLowerCase().indexOf(payload.toLowerCase()) > -1)
                .sort((a, b) => a.label.localeCompare(b.label))
            : [...state.monitorData],
      }
    }
    case SearchActionTypes.RESET: {
      if (state.query === '') {
        return state
      }

      return { ...state, query: '', results: [...state.monitorData] }
    }
    default: {
      return state
    }
  }
}
