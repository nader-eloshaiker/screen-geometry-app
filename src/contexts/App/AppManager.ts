import { ScreenItem } from '../../generated/openapi/models'
import { normaliseScreenRender } from '../../utils/ScreenCalc'

export type TLoadingTag = { status: boolean; tag: string }

export const initialScreenState = {
  screens: [] as ScreenItem[],
  query: '',
  loadingTag: [] as Array<TLoadingTag>,
  loading: false,
}

export type IScreenState = typeof initialScreenState

export enum ActionTypes {
  LIST = 'list',
  UPDATE = 'update',
  ADD = 'add',
  DELETE = 'delete',
  LOADING = 'loading',
}

export type TScreenAction =
  | { type: ActionTypes.LIST; payload: ScreenItem[] }
  | { type: ActionTypes.UPDATE; payload: ScreenItem }
  | { type: ActionTypes.ADD; payload: ScreenItem }
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
      // eslint-disable-next-line no-case-declarations
      const list = normaliseScreenRender(payload)

      return { ...state, screens: list }
    case ActionTypes.DELETE:
      // eslint-disable-next-line no-case-declarations
      const deletion = state.screens.filter((screen) => screen.id !== payload)

      return { ...state, screens: normaliseScreenRender(deletion) }
    case ActionTypes.UPDATE:
      // eslint-disable-next-line no-case-declarations
      const modification = state.screens.map((screen) =>
        payload && screen.id !== payload.id ? screen : payload,
      ) as ScreenItem[]

      return {
        ...state,
        screens: normaliseScreenRender(modification),
      }
    case ActionTypes.ADD:
      // eslint-disable-next-line no-case-declarations
      const additions = normaliseScreenRender([...state.screens, payload])

      return { ...state, screens: additions }
    case ActionTypes.LOADING:
      // eslint-disable-next-line no-case-declarations
      const result = generateLoadingTag(payload, state.loadingTag)

      return { ...state, ...result }
    default:
      return state
  }
}
