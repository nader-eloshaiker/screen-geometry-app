import { useReducer } from 'react'
import { AppContext, IScreenState, TLoadingTag, initialScreenState } from './AppContext'

import { TScreenListResponse } from '../../components/api/db/indexApi'
import { IScreen } from '../../models/Screen'

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
  | { type: ActionTypes.LOADING; payload: { status: boolean; tag: string } }

const generateLoadingTag = (val: TLoadingTag, list: Array<TLoadingTag>) => {
  const index = list.findIndex((item) => item.tag === val.tag)
  const newList = index === -1 ? [...list, val] : list.with(index, val)
  const status = newList.some((item: TLoadingTag) => item.status)

  return { loadingTag: newList, loading: status } as const
}

export const appReducer = (state: IScreenState, { type, payload }: TScreenAction): IScreenState => {
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
      // eslint-disable-next-line no-case-declarations
      const result = generateLoadingTag(payload, state.loadingTag)

      return { ...state, ...result }
    default:
      return state
  }
}

export const AppProvider = ({ children }: TReactChildren) => {
  const [screens, dispatch] = useReducer(appReducer, initialScreenState)

  return screens ? <AppContext.Provider value={[screens, dispatch]}>{children}</AppContext.Provider> : null
}
