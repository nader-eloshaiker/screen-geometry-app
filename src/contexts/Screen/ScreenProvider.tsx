import { useMemo, useReducer } from 'react'
import { ScreenContext } from './ScreenContext'
import { initialScreenState, screenReducer } from './ScreenManager'

export const ScreenProvider = ({ children }: TReactChildren) => {
  const [state, dispatch] = useReducer(screenReducer, initialScreenState)
  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch],
  )

  return <ScreenContext.Provider value={contextValue}>{children}</ScreenContext.Provider>
}
