import { createContext, Dispatch } from 'react'
import { initialScreenState, ScreenAction, ScreenState } from './ScreenManager'

export const ScreenContext = createContext<{ state: ScreenState; dispatch: Dispatch<ScreenAction> }>({
  state: initialScreenState,
  dispatch: () => {},
})
