import axios, { AxiosError } from 'axios'
import { ErrorResponse, ScreenItem } from '../../generated/openapi/models'
import { getRandomString } from '../../utils/RandomGenerator'
import { normaliseScreenRender } from '../../utils/ScreenCalc'

export type ErrorTag = { error: ErrorResponse | AxiosError; tag: string }

export const initialScreenState = {
  screens: [] as ScreenItem[],
  query: '',
  errorTags: [] as Array<ErrorTag>,
}

export type ScreenState = typeof initialScreenState

export enum AppActionTypes {
  LIST = 'list',
  UPDATE = 'update',
  ADD = 'add',
  DELETE = 'delete',
  ADD_ERROR = 'add_error',
  REMOVE_ERROR = 'remove_error',
}

export type ScreenAction =
  | { type: AppActionTypes.LIST; payload: ScreenItem[] }
  | { type: AppActionTypes.UPDATE; payload: ScreenItem }
  | { type: AppActionTypes.ADD; payload: ScreenItem }
  | { type: AppActionTypes.DELETE; payload: string }
  | { type: AppActionTypes.ADD_ERROR; payload: ErrorResponse | AxiosError }
  | { type: AppActionTypes.REMOVE_ERROR; payload: string }

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
    case AppActionTypes.ADD_ERROR:
      if (axios.isAxiosError(payload) && !axios.isCancel(payload)) {
        return { ...state, errorTags: [...state.errorTags, { error: payload, tag: getRandomString(8) }] }
      }

      return state
    case AppActionTypes.REMOVE_ERROR:
      return { ...state, errorTags: state.errorTags.filter((error) => error.tag !== payload) }
    default:
      return state
  }
}
