import { useMemo, useReducer } from 'react'
import { FormDrawerContext } from './FormDrawerContext'
import { formDrawerReducer, initialFormDrawerState } from './FormDrawerManager'

export const FormDrawerProvider = ({ children }: TReactChildren) => {
  const [state, dispatch] = useReducer(formDrawerReducer, initialFormDrawerState)
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch])

  return <FormDrawerContext.Provider value={contextValue}>{children}</FormDrawerContext.Provider>
}
