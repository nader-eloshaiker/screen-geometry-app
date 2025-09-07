import { useMemo, useReducer } from 'react'
import { ScreenContext } from './ScreenContext'
import { type ScreenState, initialScreenState, screenReducer } from './ScreenManager'

type Props = React.PropsWithChildren & { initialise?: ScreenState }

export const ScreenProvider = ({ children, initialise }: Props) => {
  const [state, dispatch] = useReducer(screenReducer, initialise ?? initialScreenState)
  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  )

  return <ScreenContext.Provider value={contextValue}>{children}</ScreenContext.Provider>
}
