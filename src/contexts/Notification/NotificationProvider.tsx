import { useReducer } from 'react'
import { NotificationContext } from './NotificationContext'
import { initialNotificationState, screenReducer } from './NotificationManager'

export const NotificationProvider = ({ children }: TReactChildren) => {
  const [screens, dispatch] = useReducer(screenReducer, initialNotificationState)

  return screens ? (
    <NotificationContext.Provider value={[screens, dispatch]}>{children}</NotificationContext.Provider>
  ) : null
}
