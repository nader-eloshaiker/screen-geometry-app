import { createContext, Dispatch } from 'react'
import { DatabaseAction, DatabaseState, initialDatabaseState } from './SearchManager'

export const SearchContext = createContext<[DatabaseState, Dispatch<DatabaseAction>]>([initialDatabaseState, () => {}])
