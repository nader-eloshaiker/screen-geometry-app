import axios, { AxiosError } from 'axios'
import { ErrorResponse, ScreenItem } from '../../generated/openapi/models'
import { getRandomString } from '../../utils/RandomGenerator'
import { normaliseScreenRender } from '../../utils/ScreenCalc'

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

export const initialScreenState = {
  screens: [] as ScreenItem[],
  query: '',
  notifications: [] as Array<NotificationItemLogged>,
}

export type ScreenState = typeof initialScreenState

export enum AppActionTypes {
  LIST = 'list',
  UPDATE = 'update',
  ADD = 'add',
  DELETE = 'delete',
  ADD_NOTIFICATION = 'add_notification',
  REMOVE_NOTIFICATION = 'remove_notification',
}

export type ScreenAction =
  | { type: AppActionTypes.LIST; payload: ScreenItem[] }
  | { type: AppActionTypes.UPDATE; payload: ScreenItem }
  | { type: AppActionTypes.ADD; payload: ScreenItem }
  | { type: AppActionTypes.DELETE; payload: string }
  | { type: AppActionTypes.ADD_NOTIFICATION; payload: NotificationItem }
  | { type: AppActionTypes.REMOVE_NOTIFICATION; payload: string }

export const appReducer = (state: ScreenState, { type, payload }: ScreenAction): ScreenState => {
  switch (type) {
    case AppActionTypes.LIST:
      // eslint-disable-next-line no-case-declarations
      const list = normaliseScreenRender(payload)

      return { ...state, screens: list }
    case AppActionTypes.DELETE:
      // eslint-disable-next-line no-case-declarations
      const deletion = state.screens.filter((screen) => screen.id !== payload)

      return { ...state, screens: normaliseScreenRender(deletion) }
    case AppActionTypes.UPDATE:
      // eslint-disable-next-line no-case-declarations
      const modification = state.screens.map((screen) =>
        payload && screen.id !== payload.id ? screen : payload,
      ) as ScreenItem[]

      return {
        ...state,
        screens: normaliseScreenRender(modification),
      }
    case AppActionTypes.ADD:
      // eslint-disable-next-line no-case-declarations
      const additions = normaliseScreenRender([...state.screens, payload])

      return { ...state, screens: additions }
    case AppActionTypes.ADD_NOTIFICATION:
      if (axios.isAxiosError(payload.value) && !axios.isCancel(payload.value)) {
        return state
      }

      return {
        ...state,
        notifications: [...state.notifications, { ...payload, tag: getRandomString(8) } as NotificationItemLogged],
      }
    case AppActionTypes.REMOVE_NOTIFICATION:
      return { ...state, notifications: state.notifications.filter((error) => error.tag !== payload) }
    default:
      return state
  }
}
