import { createContext, useReducer } from 'react'

import { TScreenListResponse } from '../components/api/db/indexApi'
import { IScreen } from '../models/Screen'

export enum ActionTypes {
  LIST = 'list',
  UPDATE = 'update',
  ADD = 'add',
  DELETE = 'delete',
  LOADING = 'loading',
}

export type TScreenAction =
  | { type: ActionTypes.LIST; payload: TScreenListResponse }
  | { type: ActionTypes.UPDATE; payload: IScreen }
  | { type: ActionTypes.ADD; payload: IScreen }
  | { type: ActionTypes.DELETE; payload: string }
  | { type: ActionTypes.LOADING; payload: boolean }

const initialScreenState = {
  selections: [] as IScreen[],
  query: '',
  loading: false,
}

type IScreenState = typeof initialScreenState

const appReducer = (state: IScreenState, { type, payload }: TScreenAction): IScreenState => {
  switch (type) {
    case ActionTypes.LIST:
      return { ...state, selections: payload.list, query: payload.q }
    case ActionTypes.DELETE:
      return { ...state, selections: state.selections.filter((screen) => screen.id !== payload) }
    case ActionTypes.UPDATE:
      return {
        ...state,
        selections: state.selections.map((screen) =>
          payload && screen.id !== payload.id ? screen : payload,
        ) as IScreen[],
      }
    case ActionTypes.ADD:
      return { ...state, selections: [...state.selections, payload] }
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
