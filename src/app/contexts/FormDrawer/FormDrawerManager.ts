import { match } from 'ts-pattern'

export enum FormDrawerMode {
  Create = 'create',
  Edit = 'edit',
  Close = 'close',
}

export const initialFormDrawerState = {
  open: false,
  mode: FormDrawerMode.Close,
  id: undefined as string | undefined,
}

export type FormDrawerState = typeof initialFormDrawerState

export enum FormDrawerEventTypes {
  Create = 'create',
  Close = 'close',
  Edit = 'edit',
}

export type FormDrawerEvent =
  | { type: FormDrawerEventTypes.Edit; payload: { id: string } }
  | { type: FormDrawerEventTypes.Create; payload?: undefined }
  | { type: FormDrawerEventTypes.Close; payload?: undefined }

export const formDrawerReducer = (state: FormDrawerState, event: FormDrawerEvent): FormDrawerState =>
  match(event)
    .returnType<FormDrawerState>()
    .with({ type: FormDrawerEventTypes.Close }, () => ({
      ...state,
      id: undefined,
      mode: FormDrawerMode.Close,
      open: false,
    }))
    .with({ type: FormDrawerEventTypes.Create }, () => ({
      ...state,
      id: undefined,
      mode: FormDrawerMode.Create,
      open: true,
    }))
    .with({ type: FormDrawerEventTypes.Edit }, ({ payload }) => ({
      ...state,
      id: payload.id,
      mode: FormDrawerMode.Edit,
      open: true,
    }))
    .exhaustive()
