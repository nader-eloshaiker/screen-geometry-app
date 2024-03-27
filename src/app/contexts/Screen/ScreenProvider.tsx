import { useMemo, useReducer } from 'react'
import { ScreenContext } from './ScreenContext'
import { ScreenState, initialScreenState, screenReducer } from './ScreenManager'

type Props = TReactChildren & { initialise?: ScreenState }

export const ScreenProvider = ({ children, initialise }: Props) => {
  const [state, dispatch] = useReducer(screenReducer, initialise ?? initialScreenState)
  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch],
  )

  return <ScreenContext.Provider value={contextValue}>{children}</ScreenContext.Provider>
}
