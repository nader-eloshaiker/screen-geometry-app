import { createContext, Dispatch } from 'react'
import { FormDrawerAction, FormDrawerState, initialFormDrawerState } from './FormDrawerManager'

export const FormDrawerContext = createContext<{ state: FormDrawerState; dispatch: Dispatch<FormDrawerAction> }>({
  state: initialFormDrawerState,
  dispatch: () => {},
})
