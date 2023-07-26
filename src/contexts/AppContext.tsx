import { createContext, useReducer } from 'react'

import { TScreenListResponse } from '../components/api/db/indexApi'
import { IScreen } from '../models/Screen'

export enum ActionTypes {
  LIST = 'list',
  UPDATE = 'update',
  CREATE = 'create',
  DELETE = 'delete',
  LOADING = 'loading',
}

export type TScreenAction =
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

const appReducer = (state: IScreenState, { type, payload }: TScreenAction): IScreenState => {
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

export const AppContext = createContext<[IScreenState, React.Dispatch<TScreenAction>]>([initialScreenState, () => {}])

export const AppProvider = ({ children }: TReactChildren) => {
  const [screens, dispatch] = useReducer(appReducer, initialScreenState)

  return screens ? <AppContext.Provider value={[screens, dispatch]}>{children}</AppContext.Provider> : null
}
