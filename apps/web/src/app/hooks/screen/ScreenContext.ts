import { createContext, type Dispatch } from 'react'
import { initialScreenState, type ScreenEvent, type ScreenState } from './ScreenManager'

export const ScreenContext = createContext<{ state: ScreenState; dispatch: Dispatch<ScreenEvent> }>({
  state: initialScreenState,
  dispatch: () => {},
})
