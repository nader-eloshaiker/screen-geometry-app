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
  Create = 'create',
  Close = 'close',
  Edit = 'edit',
}

export type FormDrawerAction =
  | { type: FormDrawerActionTypes.Edit; payload: { id: string } }
  | { type: FormDrawerActionTypes.Create; payload?: undefined }
  | { type: FormDrawerActionTypes.Close; payload?: undefined }

export const formDrawerReducer = (state: FormDrawerState, { type, payload }: FormDrawerAction): FormDrawerState => {
  switch (type) {
    case FormDrawerActionTypes.Close:
      return {
        ...state,
        id: undefined,
        mode: FormDrawerMode.Close,
        open: false,
      }
    case FormDrawerActionTypes.Create:
      return {
        ...state,
        id: undefined,
        mode: FormDrawerMode.Create,
        open: true,
      }
    case FormDrawerActionTypes.Edit:
      return { ...state, id: payload.id, mode: FormDrawerMode.Edit, open: true }
    default:
      return state
  }
}
