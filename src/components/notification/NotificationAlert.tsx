import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { NotificationActionTypes, NotificationType } from '../../contexts/Notification/NotificationManager'
import { useNotificationContext } from '../../contexts/Notification/useNotifcationContext'
import { NotificationImage } from './NotificationImage'

export type NotificationProps = { title: string; message: string; tag: string; type: NotificationType }

export const NotificationAlert = ({ title, message, tag, type }: NotificationProps) => {
  const [_, dispatch] = useNotificationContext()
  const [isClosing, setIsClosing] = useState(false)

  const onClose = () => {
    dispatch({ type: NotificationActionTypes.REMOVE_NOTIFICATION, payload: tag })
  }

  useEffect(() => {
    const timeoutFade = setTimeout(() => {
      type !== NotificationType.ERROR && setIsClosing(true)
    }, 4000)

    const timeoutClose = setTimeout(() => {
      type !== NotificationType.ERROR && onClose()
    }, 5500)

    return () => {
      clearTimeout(timeoutFade)
      clearTimeout(timeoutClose)
    }
  }, [])

  return (
    <div className={classNames({ 'transition-opacity duration-1000 opacity-0': isClosing }) + ` alert ${type}`}>
      <NotificationImage type={type} />
      <div className='flex flex-col'>
        <div>{title}</div>
        <div>{message}</div>
      </div>
      {type === NotificationType.ERROR && (
        <button className='btn btn-ghost btn-sm' onClick={onClose}>
          DISMISS
        </button>
      )}
    </div>
  )
}
