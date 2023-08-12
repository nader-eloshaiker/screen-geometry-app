import { useReducer } from 'react'
import { AppContext, initialScreenState, IScreenState, TLoadingTag } from './AppContext'

import { TScreenListResponse } from '../../components/api/db/indexApi'
import { IScreen } from '../../models/Screen'
import { getRandomInt } from '../../utils/RandomNumber'

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

const rebalanceRender = (list: IScreen[]) => {
  if (list.length === 0 || list.length === 1) {
    return list
  }

  const sorted = list.sort((a, b) => a.data.hSize - b.data.hSize)
  const biggest = sorted[0]

  for (const screen of sorted) {
    screen.render = {
      width: screen.data.hSize / biggest.data.hSize,
      height: screen.data.vSize / biggest.data.vSize,
      color: {
        r: screen.render.color.r || getRandomInt(256),
        g: screen.render.color.g || getRandomInt(256),
        b: screen.render.color.b || getRandomInt(256),
      },
    }
  }

  return sorted
}

const appReducer = (state: IScreenState, { type, payload }: TScreenAction): IScreenState => {
  switch (type) {
    case ActionTypes.LIST:
      return { ...state, selections: payload.list, query: payload.q }
    case ActionTypes.DELETE:
      // eslint-disable-next-line no-case-declarations
      const deletion = state.selections.filter((screen) => screen.id !== payload)

      return { ...state, selections: rebalanceRender(deletion) }
    case ActionTypes.UPDATE:
      // eslint-disable-next-line no-case-declarations
      const modification = state.selections.map((screen) =>
        payload && screen.id !== payload.id ? screen : payload,
      ) as IScreen[]

      return {
        ...state,
        selections: rebalanceRender(modification),
      }
    case ActionTypes.ADD:
      // eslint-disable-next-line no-case-declarations
      const addition = [...state.selections, payload]

      return { ...state, selections: rebalanceRender(addition) }
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
