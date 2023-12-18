import {
  GeneralNotificationItem,
  GeneralNotificationItemKeys,
  NotificationItemLogged,
} from '@contexts/Notification/NotificationManager'
import { useNotificationContext } from '@contexts/Notification/useNotifcationContext'
import { ErrorResponse } from '@openapi/generated/models'
import axios, { AxiosError } from 'axios'
import { NotificationAlert, NotificationProps } from './NotificationAlert'

const isGeneralNotification = ({ value }: NotificationItemLogged) => {
  const keys = Object.keys(value)
  return (
    keys.length === 2 &&
    keys.reduce(
      (acc, key) =>
        acc &&
        [GeneralNotificationItemKeys.TITLE as string, GeneralNotificationItemKeys.MESSAGE as string].includes(key),
      true,
    )
  )
}

const isErrorResponse = ({ value }: NotificationItemLogged) => {
  const keys = Object.keys(value)
  return keys.length === 1 && keys[0] === 'error'
}

const isAxiosNotification = ({ value }: NotificationItemLogged) => axios.isAxiosError(value)

const getContent = (notification: NotificationItemLogged) => {
  const { type, tag } = notification

  if (isGeneralNotification(notification)) {
    const { title, message } = notification.value as GeneralNotificationItem
    return { title, message, tag, type } as NotificationProps
  }

  if (isErrorResponse(notification)) {
    const { error } = notification.value as ErrorResponse
    const { code, status, message } = error
    return {
      title: `Error: ${code}`,
      message: `${status}: ${message}`,
      tag,
      type,
    } as NotificationProps
  }

  if (isAxiosNotification(notification)) {
    const axiosError = notification.value as AxiosError
    const { code, name, message } = axiosError
    return {
      title: `Error: ${code}`,
      message: `${name}: ${message}`,
      tag,
      type,
    } as NotificationProps
  }

  return { title: 'Uknown', message: 'A general error has occurred', tag, type } as NotificationProps
}

export const NotificationToaster = () => {
  const {
    state: { notifications },
  } = useNotificationContext()

  return (
    <div className='toast toast-end'>
      {notifications.map((notification) => (
        <NotificationAlert key={notification.tag} {...getContent(notification)} />
      ))}
    </div>
  )
}
