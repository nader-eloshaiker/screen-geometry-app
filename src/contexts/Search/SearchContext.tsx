import { createContext, Dispatch } from 'react'
import { DatabaseState, initialDatabaseState, DatabaseAction } from './SearchManager'

export const SearchContext = createContext<[DatabaseState, Dispatch<DatabaseAction>]>([initialDatabaseState, () => {}])
