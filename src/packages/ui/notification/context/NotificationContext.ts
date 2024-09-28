import { createContext, Dispatch } from 'react'
import { initialNotificationState, NotificationEvent, NotificationState } from './NotificationManager'

export const NotificationContext = createContext<{
  state: NotificationState
  dispatch: Dispatch<NotificationEvent>
}>({ state: initialNotificationState, dispatch: () => {} })
