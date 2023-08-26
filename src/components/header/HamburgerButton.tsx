import { twMerge } from 'tailwind-merge'
import EditIcon from '../../assets/icons/Edit'
import HamburgerIcon from '../../assets/icons/Hamburger'
import { useDrawerContext } from '../../contexts/drawer/useDrawerContext'

type TProps = TRestProps & { className?: string }

export default function HamburgerButton({ className, ...rest }: TProps) {
  const drawerRef = useDrawerContext()

  const toggleDrawer = () => {
    drawerRef?.current?.click()
  }

  return (
    <label className={twMerge(className, 'swap-rotate swap')} {...rest}>
      {/* this hidden checkbox controls the state */}
      <input type='checkbox' className='hidden' onClick={toggleDrawer} />

      <EditIcon id='theme-dark-icon' className='swap-off h-5 w-5 p-0' fill='currentColor' />
      <HamburgerIcon id='theme-light-icon' className='swap-on h-5 w-5 p-0' fill='currentColor' />
    </label>
  )
}
