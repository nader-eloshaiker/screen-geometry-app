import { createContext, useReducer } from 'react'

import { IScreen } from '../../models/Screen'
import { TScreenListResponse } from './db/indexApi'

export enum ActionTypes {
  LIST = 'list',
  UPDATE = 'update',
  CREATE = 'create',
  DELETE = 'delete',
  LOADING = 'loading',
}

type TScreenAction =
  | { type: ActionTypes.LIST; payload: TScreenListResponse }
  | { type: ActionTypes.UPDATE; payload: IScreen }
  | { type: ActionTypes.CREATE; payload: IScreen }
  | { type: ActionTypes.DELETE; payload: string }
  | { type: ActionTypes.LOADING; payload: boolean }

const initialScreenState = {
  screens: [] as IScreen[],
  query: '',
  loading: false,
}

type IScreenState = typeof initialScreenState

const screenReducer = (state: IScreenState, { type, payload }: TScreenAction): IScreenState => {
  switch (type) {
    case ActionTypes.LIST:
      return { ...state, screens: payload.list, query: payload.q }
    case ActionTypes.DELETE:
      return { ...state, screens: state.screens.filter((screen) => screen.id !== payload) }
    case ActionTypes.UPDATE:
      return {
        ...state,
        screens: state.screens.map((screen) => (payload && screen.id !== payload.id ? screen : payload)) as IScreen[],
      }
    case ActionTypes.CREATE:
      return { ...state, screens: [...state.screens, payload] }
    case ActionTypes.LOADING:
      return { ...state, loading: payload }
    default:
      return state
  }
}

export const DataContext = createContext<[IScreenState, React.Dispatch<TScreenAction>]>([initialScreenState, () => {}])

export default function DataProvider({ children }: TReactChildren) {
  const [screens, dispatch] = useReducer(screenReducer, initialScreenState)

  return screens ? <DataContext.Provider value={[screens, dispatch]}>{children}</DataContext.Provider> : null
}
