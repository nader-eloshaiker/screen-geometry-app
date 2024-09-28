import { createContext, Dispatch } from 'react'
import { FormDrawerEvent, FormDrawerState, initialFormDrawerState } from './FormDrawerManager'

export const FormDrawerContext = createContext<{
  formDrawerState: FormDrawerState
  dispatchFormDrawer: Dispatch<FormDrawerEvent>
}>({
  formDrawerState: initialFormDrawerState,
  dispatchFormDrawer: () => {},
})
