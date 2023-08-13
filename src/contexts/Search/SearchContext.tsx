import { createContext, Dispatch } from 'react'
import { IDabaseState, initialDatabaseState, TDatabaseAction } from './SearchManager'

export const SearchContext = createContext<[IDabaseState, Dispatch<TDatabaseAction>]>([initialDatabaseState, () => {}])
