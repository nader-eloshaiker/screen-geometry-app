import { createContext } from 'react'
import { initialScreenState, ScreenAction, ScreenState } from './ScreenManager'

export const ScreenContext = createContext<[ScreenState, React.Dispatch<ScreenAction>]>([initialScreenState, () => {}])
