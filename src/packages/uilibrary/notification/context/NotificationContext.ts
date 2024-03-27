import { createContext, Dispatch } from 'react'
import { initialNotificationState, NotificationAction, NotificationState } from './NotificationManager'

export const NotificationContext = createContext<{
  state: NotificationState
  dispatch: Dispatch<NotificationAction>
}>({ state: initialNotificationState, dispatch: () => {} })
