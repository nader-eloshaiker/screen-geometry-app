import { useReducer } from 'react'
import { ScreenContext } from './ScreenContext'
import { initialScreenState, screenReducer } from './ScreenManager'

export const ScreenProvider = ({ children }: TReactChildren) => {
  const [screens, dispatch] = useReducer(screenReducer, initialScreenState)

  return screens ? <ScreenContext.Provider value={[screens, dispatch]}>{children}</ScreenContext.Provider> : null
}
