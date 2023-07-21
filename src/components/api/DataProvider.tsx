import { createContext, useReducer } from 'react'

import { IScreenSpec } from '../../models/Screen'
import { TGetScreenListResponse } from './db/indexApi'

export enum ActionTypes {
  LOAD = 'load',
  UPDATE = 'update',
  CREATE = 'create',
  DELETE = 'delete',
}

type TScreenAction =
  | { type: ActionTypes.LOAD; payload: TGetScreenListResponse }
  | { type: ActionTypes.UPDATE; payload: IScreenSpec }
  | { type: ActionTypes.CREATE; payload: IScreenSpec }
  | { type: ActionTypes.DELETE; payload: string }

const initialScreenState = {
  screens: [] as IScreenSpec[],
  query: '',
}

type IScreenState = typeof initialScreenState

const screenReducer = (state: IScreenState, { type, payload }: TScreenAction): IScreenState => {
  switch (type) {
    case ActionTypes.LOAD:
      return { ...state, screens: payload.list, query: payload.q }
    case ActionTypes.DELETE:
      return { ...state, screens: state.screens.filter((screen) => screen.id !== payload) }
    case ActionTypes.UPDATE:
      return {
        ...state,
        screens: state.screens.map((screen) =>
          payload && screen.id !== payload.id ? screen : payload,
        ) as IScreenSpec[],
      }
    case ActionTypes.CREATE:
      return { ...state, screens: [...state.screens, payload] }
    default:
      return state
  }
}

export const DataContext = createContext<[IScreenState, React.Dispatch<TScreenAction>]>([initialScreenState, () => {}])

export default function DataProvider({ children }: TReactChildren) {
  const [screens, dispatch] = useReducer(screenReducer, initialScreenState)

  return screens ? <DataContext.Provider value={[screens, dispatch]}>{children}</DataContext.Provider> : null
}
