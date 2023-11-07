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

export enum FormDrawerActionTypes {
  Toggle = 'toggle',
  Edit = 'edit',
}

export type FormDrawerAction =
  | { type: FormDrawerActionTypes.Toggle; payload?: { open: boolean } }
  | { type: FormDrawerActionTypes.Edit; payload: { id: string } }

export const formDrawerReducer = (state: FormDrawerState, { type, payload }: FormDrawerAction): FormDrawerState => {
  switch (type) {
    case FormDrawerActionTypes.Toggle:
      return {
        ...state,
        id: undefined,
        mode: payload?.open ?? !state.open ? FormDrawerMode.Create : FormDrawerMode.Close,
        open: payload?.open ?? !state.open,
      }
    case FormDrawerActionTypes.Edit:
      return { ...state, id: payload.id, mode: FormDrawerMode.Edit, open: true }
    default:
      return state
  }
}
