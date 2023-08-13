import { useReducer } from 'react'
import { AppContext } from './AppContext'
import { appReducer, initialScreenState } from './AppManager'

export const AppProvider = ({ children }: TReactChildren) => {
  const [screens, dispatch] = useReducer(appReducer, initialScreenState)

  return screens ? <AppContext.Provider value={[screens, dispatch]}>{children}</AppContext.Provider> : null
}
