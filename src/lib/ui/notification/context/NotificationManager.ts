import { ErrorResponse } from '@/lib/openapi/generated'
import axios, { AxiosError } from 'axios'
import { match } from 'ts-pattern'
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

export enum NotificationEventTypes {
  ADD_NOTIFICATION = 'add_notification',
  REMOVE_NOTIFICATION = 'remove_notification',
}

export type NotificationEvent =
  | { type: NotificationEventTypes.ADD_NOTIFICATION; payload: NotificationItem }
  | { type: NotificationEventTypes.REMOVE_NOTIFICATION; payload: string }

export const notificationReducer = (state: NotificationState, event: NotificationEvent): NotificationState =>
  match(event)
    .returnType<NotificationState>()
    .with({ type: NotificationEventTypes.ADD_NOTIFICATION }, ({ payload }) => {
      if (axios.isAxiosError(payload.value) && axios.isCancel(payload.value)) {
        return state
      }

      const loggedItem: NotificationItemLogged = { ...payload, tag: ulid() }

      return {
        ...state,
        notifications: [...state.notifications, loggedItem],
      }
    })
    .with({ type: NotificationEventTypes.REMOVE_NOTIFICATION }, ({ payload }) => {
      return { ...state, notifications: state.notifications.filter((error) => error.tag !== payload) }
    })
    .exhaustive()
