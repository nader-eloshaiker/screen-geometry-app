import { createContext } from 'react'
import { initialScreenState, IScreenState, TScreenAction } from './AppManager'

export const AppContext = createContext<[IScreenState, React.Dispatch<TScreenAction>]>([initialScreenState, () => {}])
