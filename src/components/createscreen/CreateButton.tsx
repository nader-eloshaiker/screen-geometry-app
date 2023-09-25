import { RefObject } from 'react'
import { twMerge } from 'tailwind-merge'
import EditIcon from '../../assets/icons/Edit'
import HamburgerIcon from '../../assets/icons/Hamburger'

type TProps = TRestProps & { className?: string; drawerRef: RefObject<HTMLInputElement> }

export const ScreenButton = ({ className, drawerRef, ...rest }: TProps) => {
  const toggleDrawer = () => {
    drawerRef.current?.click()
  }

  return (
    <label className={twMerge(className, 'swap swap-rotate')} {...rest}>
      {/* this hidden checkbox controls the state */}
      <input type='checkbox' className='hidden' onClick={toggleDrawer} />

      <EditIcon id='theme-dark-icon' className='swap-off h-5 w-5 p-0' fill='currentColor' />
      <HamburgerIcon id='theme-light-icon' className='swap-on h-5 w-5 p-0' fill='currentColor' />
    </label>
  )
}
