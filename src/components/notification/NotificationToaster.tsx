import axios, { AxiosError } from 'axios'
import {
  GeneralNotificationItem,
  GeneralNotificationItemKeys,
  NotificationItemLogged,
} from '../../contexts/App/AppManager'
import { useAppContext } from '../../contexts/App/useAppContext'
import { ErrorResponse } from '../../generated/openapi/models'
import { NotificationAlert, NotificationProps } from './NotificationAlert'

export const NotificationToaster = () => {
  const [{ notifications }] = useAppContext()

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

  return (
    <div className='toast toast-end'>
      {notifications.map((notification, index) => (
        <NotificationAlert key={index} {...getContent(notification)} />
      ))}
    </div>
  )
}
