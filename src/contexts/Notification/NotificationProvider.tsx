import { useMemo, useReducer } from 'react'
import { NotificationContext } from './NotificationContext'
import { initialNotificationState, notificationReducer } from './NotificationManager'

export const NotificationProvider = ({ children }: TReactChildren) => {
  const [state, dispatch] = useReducer(notificationReducer, initialNotificationState)

  const contextValue = useMemo(() => ({ state, dispatch }), [state])

  return <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>
}
