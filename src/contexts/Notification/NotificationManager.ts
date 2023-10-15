import axios, { AxiosError } from 'axios'
import { ErrorResponse } from '../../generated/openapi/models'
import { getRandomString } from '../../utils/RandomGenerator'

export enum NotificationType {
  ERROR = 'alert-error',
  WARNING = 'alert-warning',
  SUCCESS = 'alert-success',
}

export enum GeneralNotificationItemKeys {
  TITLE = 'title',
  MESSAGE = 'message',
}
export type GeneralNotificationItem = {
  [GeneralNotificationItemKeys.TITLE]: string
  [GeneralNotificationItemKeys.MESSAGE]: string
}
export type NotificationItem = {
  value: ErrorResponse | AxiosError | GeneralNotificationItem
  type: NotificationType
}
export type NotificationItemLogged = {
  tag: string
} & NotificationItem

export const initialNotificationState = {
  notifications: [] as Array<NotificationItemLogged>,
}

export type NotificationState = typeof initialNotificationState

export enum NotificationActionTypes {
  ADD_NOTIFICATION = 'add_notification',
  REMOVE_NOTIFICATION = 'remove_notification',
}

export type NotificationAction =
  | { type: NotificationActionTypes.ADD_NOTIFICATION; payload: NotificationItem }
  | { type: NotificationActionTypes.REMOVE_NOTIFICATION; payload: string }

export const notificationReducer = (
  state: NotificationState,
  { type, payload }: NotificationAction,
): NotificationState => {
  switch (type) {
    case NotificationActionTypes.ADD_NOTIFICATION:
      if (axios.isAxiosError(payload.value) && !axios.isCancel(payload.value)) {
        return state
      }

      return {
        ...state,
        notifications: [...state.notifications, { ...payload, tag: getRandomString(8) } as NotificationItemLogged],
      }
    case NotificationActionTypes.REMOVE_NOTIFICATION:
      return { ...state, notifications: state.notifications.filter((error) => error.tag !== payload) }
    default:
      return state
  }
}
