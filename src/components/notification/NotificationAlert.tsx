import { NotificationActionTypes, NotificationType } from '@contexts/Notification/NotificationManager'
import { useNotificationContext } from '@contexts/Notification/useNotifcationContext'
import { clsx } from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import { NotificationImage } from './NotificationImage'

export type NotificationProps = { title: string; message: string; tag: string; type: NotificationType }

export const NotificationAlert = ({ title, message, tag, type }: NotificationProps) => {
  const { dispatch } = useNotificationContext()
  const [isClosing, setIsClosing] = useState(false)

  const onClose = useCallback(() => {
    dispatch({ type: NotificationActionTypes.REMOVE_NOTIFICATION, payload: tag })
  }, [dispatch, tag])

  useEffect(() => {
    const timeoutFade = setTimeout(() => {
      type !== NotificationType.ERROR && setIsClosing(true)
    }, 3000)

    const timeoutClose = setTimeout(() => {
      type !== NotificationType.ERROR && onClose()
    }, 3500)

    return () => {
      clearTimeout(timeoutFade)
      clearTimeout(timeoutClose)
    }
  }, [onClose, type])

  return (
    <div className={clsx(`alert ${type}`, { 'opacity-0 transition-opacity duration-1000': isClosing })}>
      <NotificationImage type={type} />
      <div className='flex flex-col gap-2 sm:flex-row'>
        <div className='font-semibold'>{title}</div>
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
