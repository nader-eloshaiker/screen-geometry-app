import { createContext } from 'react'
import { initialNotificationState, NotificationAction, NotificationState } from './NotificationManager'

export const NotificationContext = createContext<[NotificationState, React.Dispatch<NotificationAction>]>([
  initialNotificationState,
  () => {},
])
