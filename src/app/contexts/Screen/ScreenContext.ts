import { createContext, Dispatch } from 'react'
import { initialScreenState, ScreenEvent, ScreenState } from './ScreenManager'

export const ScreenContext = createContext<{ state: ScreenState; dispatch: Dispatch<ScreenEvent> }>({
  state: initialScreenState,
  dispatch: () => {},
})
