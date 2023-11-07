import { useMemo, useReducer } from 'react'
import { FormDrawerContext } from './FormDrawerContext'
import { formDrawerReducer, initialFormDrawerState } from './FormDrawerManager'

export const FormDrawerProvider = ({ children }: TReactChildren) => {
  const [formDrawerState, dispatchFormDrawer] = useReducer(formDrawerReducer, initialFormDrawerState)
  const contextValue = useMemo(() => ({ formDrawerState, dispatchFormDrawer }), [formDrawerState, dispatchFormDrawer])

  return <FormDrawerContext.Provider value={contextValue}>{children}</FormDrawerContext.Provider>
}
