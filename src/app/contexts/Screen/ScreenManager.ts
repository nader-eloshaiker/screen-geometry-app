import { ScreenItemRender } from '@app/models/screenItemRender'
import { ScreenItem } from '@packages/openapi/generated'
import { normaliseScreenRender } from '@packages/utils/ScreenCalc'

export const initialScreenState = {
  screens: [] as ScreenItemRender[],
  query: '',
}

export type ScreenState = typeof initialScreenState

export enum ScreenActionTypes {
  LOAD = 'list',
  UPDATE = 'update',
  ADD = 'add',
  ADD_LIST = 'add_list',
  DELETE = 'delete',
}

export type ScreenAction =
  | { type: ScreenActionTypes.LOAD; payload: ScreenItem[] }
  | { type: ScreenActionTypes.UPDATE; payload: ScreenItem }
  | { type: ScreenActionTypes.ADD; payload: ScreenItem }
  | { type: ScreenActionTypes.ADD_LIST; payload: ScreenItem[] }
  | { type: ScreenActionTypes.DELETE; payload: string }

export const screenReducer = (state: ScreenState, { type, payload }: ScreenAction): ScreenState => {
  switch (type) {
    case ScreenActionTypes.LOAD: {
      const list = normaliseScreenRender(payload ?? [])

      return { ...state, screens: list }
    }
    case ScreenActionTypes.DELETE: {
      const deletion = state.screens.filter((screen) => screen.id !== payload)

      return { ...state, screens: normaliseScreenRender(deletion) }
    }
    case ScreenActionTypes.UPDATE: {
      const modification = state.screens.map((screen) => (payload && screen.id !== payload.id ? screen : payload))

      return {
        ...state,
        screens: normaliseScreenRender(modification),
      }
    }
    case ScreenActionTypes.ADD: {
      const additions = normaliseScreenRender([...state.screens, payload])

      return { ...state, screens: additions }
    }
    case ScreenActionTypes.ADD_LIST: {
      const additionList = normaliseScreenRender([...state.screens, ...payload])

      return { ...state, screens: additionList }
    }
  }
}
