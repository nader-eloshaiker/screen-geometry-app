import { useMemo, useReducer } from 'react'
import { SearchContext } from './SearchContext'

import { initialDatabaseState, searchReducer } from './SearchManager'

export const SearchProvider = ({ children }: TReactChildren) => {
  const [state, dispatch] = useReducer(searchReducer, initialDatabaseState)
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch])

  return <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>
}
