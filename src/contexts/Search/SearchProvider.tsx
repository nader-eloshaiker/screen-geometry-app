import { useReducer } from 'react'
import { SearchContext, initialDatabaseState, searchReducer } from './SearchContext'

export const SearchProvider = ({ children }: TReactChildren) => {
  const [database, dispatch] = useReducer(searchReducer, initialDatabaseState)

  return database ? <SearchContext.Provider value={[database, dispatch]}>{children}</SearchContext.Provider> : null
}
