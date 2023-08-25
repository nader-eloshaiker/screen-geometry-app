import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { AppActionTypes, NotificationType } from '../../contexts/App/AppManager'
import { useAppContext } from '../../contexts/App/useAppContext'
import { NotificationImage } from './NotificationImage'

export type NotificationProps = { title: string; message: string; tag: string; type: NotificationType }

export const NotificationAlert = ({ title, message, tag, type }: NotificationProps) => {
  const [_, dispatch] = useAppContext()
  const [isClosing, setIsClosing] = useState(false)

  const onClose = () => {
    dispatch({ type: AppActionTypes.REMOVE_NOTIFICATION, payload: tag })
  }

  useEffect(() => {
    const timeoutFade = setTimeout(() => {
      type !== NotificationType.ERROR && setIsClosing(true)
    }, 2000)

    const timeoutClose = setTimeout(() => {
      type !== NotificationType.ERROR && onClose()
    }, 4000)

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
