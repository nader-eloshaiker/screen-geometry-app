import { useReducer } from 'react'
import { NotificationContext } from './NotificationContext'
import { appReducer, initialNotificationState } from './NotificationManager'

export const NotificationProvider = ({ children }: TReactChildren) => {
  const [screens, dispatch] = useReducer(appReducer, initialNotificationState)

  return screens ? (
    <NotificationContext.Provider value={[screens, dispatch]}>{children}</NotificationContext.Provider>
  ) : null
}
