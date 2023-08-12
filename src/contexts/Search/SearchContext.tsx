import { createContext, Dispatch } from 'react'
import { TDatabaseAction } from './SearchProvider'
import { ISearch } from '../../models/Database'

export const initialDatabaseState = {
  monitorData: [] as ISearch[],
  results: [] as ISearch[],
  query: '',
}

export type IDabaseState = typeof initialDatabaseState


export const SearchContext = createContext<[IDabaseState, Dispatch<TDatabaseAction>]>([initialDatabaseState, () => {}])
