import { ScreenItemRender } from '@/app/models/screenItemRender'
import { normaliseScreenRender } from '@/lib/utils'
import { ScreenItem } from '@screengeometry/lib-api/spec'
import { match } from 'ts-pattern'

export const initialScreenState = {
  screens: [] as ScreenItemRender[],
  query: '',
}

export type ScreenState = typeof initialScreenState

export enum ScreenEventTypes {
  LOAD = 'list',
  UPDATE = 'update',
  ADD = 'add',
  ADD_LIST = 'add_list',
  DELETE = 'delete',
}

export type ScreenEvent =
  | { type: ScreenEventTypes.LOAD; payload: ScreenItem[] }
  | { type: ScreenEventTypes.UPDATE; payload: ScreenItem }
  | { type: ScreenEventTypes.ADD; payload: ScreenItem }
  | { type: ScreenEventTypes.ADD_LIST; payload: ScreenItem[] }
  | { type: ScreenEventTypes.DELETE; payload: string }

export const screenReducer = (state: ScreenState, event: ScreenEvent): ScreenState =>
  match(event)
    .returnType<ScreenState>()
    .with({ type: ScreenEventTypes.LOAD }, ({ payload }) => {
      const list = normaliseScreenRender(payload ?? [])

      return { ...state, screens: list }
    })
    .with({ type: ScreenEventTypes.DELETE }, ({ payload }) => {
      const deletion = state.screens.filter((screen) => screen.id !== payload)

      return { ...state, screens: normaliseScreenRender(deletion) }
    })
    .with({ type: ScreenEventTypes.UPDATE }, ({ payload }) => {
      const modification = state.screens.map((screen) => (payload && screen.id !== payload.id ? screen : payload))

      return {
        ...state,
        screens: normaliseScreenRender(modification),
      }
    })
    .with({ type: ScreenEventTypes.ADD }, ({ payload }) => {
      const additions = normaliseScreenRender([...state.screens, payload])

      return { ...state, screens: additions }
    })
    .with({ type: ScreenEventTypes.ADD_LIST }, ({ payload }) => {
      const additionList = normaliseScreenRender([...state.screens, ...payload])

      return { ...state, screens: additionList }
    })
    .exhaustive()
