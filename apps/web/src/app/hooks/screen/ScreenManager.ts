import type { ScreenItemRender } from '@/app/models/screenItemRender'
import { normaliseScreenRender } from '@/lib/utils'
import type { ScreenItem } from '@screengeometry/lib-api/spec'
import { match } from 'ts-pattern'

export const initialScreenState = {
  screens: [] as ScreenItemRender[],
  query: '',
}

export type ScreenState = typeof initialScreenState

export const ScreenEvent = {
  load: 'load',
  delete: 'delete',
  update: 'update',
  add: 'add',
  addList: 'add_list',
} as const
export type ScreenEvent =
  | { type: 'load'; payload: ScreenItem[] }
  | { type: 'update'; payload: ScreenItem }
  | { type: 'add'; payload: ScreenItem }
  | { type: 'add_list'; payload: ScreenItem[] }
  | { type: 'delete'; payload: string }

export const screenReducer = (state: ScreenState, event: ScreenEvent): ScreenState =>
  match(event)
    .returnType<ScreenState>()
    .with({ type: ScreenEvent.load }, ({ payload }) => {
      const list = normaliseScreenRender(payload ?? [])

      return { ...state, screens: list }
    })
    .with({ type: ScreenEvent.delete }, ({ payload }) => {
      const deletion = state.screens.filter((screen) => screen.id !== payload)

      return { ...state, screens: normaliseScreenRender(deletion) }
    })
    .with({ type: ScreenEvent.update }, ({ payload }) => {
      const modification = state.screens.map((screen) => (payload && screen.id !== payload.id ? screen : payload))

      return {
        ...state,
        screens: normaliseScreenRender(modification),
      }
    })
    .with({ type: ScreenEvent.add }, ({ payload }) => {
      const additions = normaliseScreenRender([...state.screens, payload])

      return { ...state, screens: additions }
    })
    .with({ type: ScreenEvent.addList }, ({ payload }) => {
      const additionList = normaliseScreenRender([...state.screens, ...payload])

      return { ...state, screens: additionList }
    })
    .exhaustive()
