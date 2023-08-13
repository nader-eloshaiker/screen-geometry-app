import { useReducer } from 'react'
import { SearchContext } from './SearchContext'

import { initialDatabaseState, searchReducer } from './SearchManager'

export const SearchProvider = ({ children }: TReactChildren) => {
  const [database, dispatch] = useReducer(searchReducer, initialDatabaseState)

  return database ? <SearchContext.Provider value={[database, dispatch]}>{children}</SearchContext.Provider> : null
}
