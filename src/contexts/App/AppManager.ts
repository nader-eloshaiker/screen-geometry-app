import { ScreenItem } from '../../generated/openapi/models'
import { normaliseScreenRender } from '../../utils/ScreenCalc'

export type LoadingTag = { status: boolean; tag: string }

export const initialScreenState = {
  screens: [] as ScreenItem[],
  query: '',
  loadingTag: [] as Array<LoadingTag>,
  loading: false,
}

export type ScreenState = typeof initialScreenState

export enum AppActionTypes {
  LIST = 'list',
  UPDATE = 'update',
  ADD = 'add',
  DELETE = 'delete',
  LOADING = 'loading',
}

export type ScreenAction =
  | { type: AppActionTypes.LIST; payload: ScreenItem[] }
  | { type: AppActionTypes.UPDATE; payload: ScreenItem }
  | { type: AppActionTypes.ADD; payload: ScreenItem }
  | { type: AppActionTypes.DELETE; payload: string }
  | { type: AppActionTypes.LOADING; payload: { status: boolean; tag: string } }

const generateLoadingTag = (val: LoadingTag, list: Array<LoadingTag>) => {
  const index = list.findIndex((item) => item.tag === val.tag)
  const newList = index === -1 ? [...list, val] : list.with(index, val)
  const status = newList.some((item: LoadingTag) => item.status)

  return { loadingTag: newList, loading: status } as const
}

export const appReducer = (state: ScreenState, { type, payload }: ScreenAction): ScreenState => {
  switch (type) {
    case AppActionTypes.LIST:
      // eslint-disable-next-line no-case-declarations
      const list = normaliseScreenRender(payload)

      return { ...state, screens: list }
    case AppActionTypes.DELETE:
      // eslint-disable-next-line no-case-declarations
      const deletion = state.screens.filter((screen) => screen.id !== payload)

      return { ...state, screens: normaliseScreenRender(deletion) }
    case AppActionTypes.UPDATE:
      // eslint-disable-next-line no-case-declarations
      const modification = state.screens.map((screen) =>
        payload && screen.id !== payload.id ? screen : payload,
      ) as ScreenItem[]

      return {
        ...state,
        screens: normaliseScreenRender(modification),
      }
    case AppActionTypes.ADD:
      // eslint-disable-next-line no-case-declarations
      const additions = normaliseScreenRender([...state.screens, payload])

      return { ...state, screens: additions }
    case AppActionTypes.LOADING:
      // eslint-disable-next-line no-case-declarations
      const result = generateLoadingTag(payload, state.loadingTag)

      return { ...state, ...result }
    default:
      return state
  }
}
