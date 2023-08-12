import { createContext } from 'react'
import { TScreenAction } from './AppProvider'
import { IScreen } from '../../models/Screen'

export type TLoadingTag = { status: boolean; tag: string }

export const initialScreenState = {
  selections: [] as IScreen[],
  query: '',
  loadingTag: [] as Array<TLoadingTag>,
  loading: false,
}

export type IScreenState = typeof initialScreenState

export const AppContext = createContext<[IScreenState, React.Dispatch<TScreenAction>]>([initialScreenState, () => {}])
