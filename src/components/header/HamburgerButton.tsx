import { twMerge } from 'tailwind-merge'
import CloseIcon from '../../assets/icons/Close'
import HamburgerIcon from '../../assets/icons/Hamburger'
import { useDrawerContext } from '../../contexts/drawer/useDrawerContext'

type TProps = TRestProps & { className?: string }

export default function HamburgerButton({ className, ...rest }: TProps) {
  const drawerRef = useDrawerContext()

  const toggleDrawer = () => {
    drawerRef?.current?.click()
  }

  return (
    <label className={twMerge(className, 'swap swap-rotate')} {...rest}>
      {/* this hidden checkbox controls the state */}
      <input type='checkbox' className='hidden' onClick={toggleDrawer} />

      <CloseIcon id='theme-dark-icon' className='w-6 h-6 p-0 swap-on' fill='currentColor' />
      <HamburgerIcon id='theme-light-icon' className='w-6 h-6 p-0 swap-off' fill='currentColor' />
    </label>
  )
}
