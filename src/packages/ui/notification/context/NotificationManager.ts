import { ErrorResponse } from '@packages/openapi/generated'
import axios, { AxiosError } from 'axios'
import { ulid } from 'ulid'

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: ErrorResponse | GeneralNotificationItem | AxiosError<unknown, any> | object
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
    case NotificationActionTypes.ADD_NOTIFICATION: {
      if (axios.isAxiosError(payload.value) && axios.isCancel(payload.value)) {
        return state
      }

      const loggedItem: NotificationItemLogged = { ...payload, tag: ulid() }

      return {
        ...state,
        notifications: [...state.notifications, loggedItem],
      }
    }
    case NotificationActionTypes.REMOVE_NOTIFICATION: {
      return { ...state, notifications: state.notifications.filter((error) => error.tag !== payload) }
    }
    default:
      return state
  }
}
