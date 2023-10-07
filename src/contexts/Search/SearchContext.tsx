import { createContext, Dispatch } from 'react'
import { DatabaseAction, DatabaseState, initialDatabaseState } from './SearchManager'

export const SearchContext = createContext<{ state: DatabaseState; dispatch: Dispatch<DatabaseAction> }>({
  state: initialDatabaseState,
  dispatch: () => {},
})
