import { createContext, Dispatch } from 'react'
import { FormDrawerAction, FormDrawerState, initialFormDrawerState } from './FormDrawerManager'

export const FormDrawerContext = createContext<{
  formDrawerState: FormDrawerState
  dispatchFormDrawer: Dispatch<FormDrawerAction>
}>({
  formDrawerState: initialFormDrawerState,
  dispatchFormDrawer: () => {},
})
