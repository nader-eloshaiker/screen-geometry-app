import { RefObject, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import CloseIcon from '../../assets/icons/Close'
import EditIcon from '../../assets/icons/Edit'

type TProps = TRestProps & { className?: string; drawerRef: RefObject<HTMLInputElement> }

export const ScreenButton = ({ className, drawerRef, ...rest }: TProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggleDrawer = () => {
    drawerRef.current?.click()
    setIsOpen(!isOpen)
  }

  return (
    <button className={twMerge(className, 'btn btn-secondary btn-outline w-40')} onClick={toggleDrawer} {...rest}>
      <div className='flex w-full items-center justify-between'>
        <label className='swap swap-rotate'>
          {/* this hidden checkbox controls the state */}
          <input type='checkbox' className='hidden' checked={isOpen} readOnly />

          <EditIcon id='theme-dark-icon' className='swap-off h-5 w-5 p-0' fill='currentColor' />
          <CloseIcon id='theme-light-icon' className='swap-on h-5 w-5 p-0' fill='currentColor' />
        </label>
        {isOpen ? 'Close Editor' : 'Open Editor'}
      </div>
    </button>
  )
}
