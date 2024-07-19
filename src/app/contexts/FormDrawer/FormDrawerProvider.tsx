import { useMemo, useReducer } from 'react'
import { FormDrawerContext } from './FormDrawerContext'
import { FormDrawerState, formDrawerReducer, initialFormDrawerState } from './FormDrawerManager'

export const FormDrawerProvider = ({ children, initialise }: TReactChildren & { initialise?: FormDrawerState }) => {
  const [formDrawerState, dispatchFormDrawer] = useReducer(formDrawerReducer, initialise ?? initialFormDrawerState)
  const contextValue = useMemo(() => ({ formDrawerState, dispatchFormDrawer }), [formDrawerState])

  return <FormDrawerContext.Provider value={contextValue}>{children}</FormDrawerContext.Provider>
}
