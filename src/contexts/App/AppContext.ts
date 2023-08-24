import { createContext } from 'react'
import { initialScreenState, ScreenAction, ScreenState } from './AppManager'

export const AppContext = createContext<[ScreenState, React.Dispatch<ScreenAction>]>([initialScreenState, () => {}])
