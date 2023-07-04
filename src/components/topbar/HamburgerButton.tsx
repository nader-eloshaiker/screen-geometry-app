import { useContext } from 'react'
import HamburgerIcon from '../icons/Hamburger'
import { Context } from '../sidebar/SidebarProvider'

export default function HamburgerButton() {
  const drawerRef = useContext(Context)

  const toggleDrawer = () => {
    drawerRef?.current?.click()
  }

  return (
    <div className='lightModeText lg:hidden'>
      <button className='p-2 py-0 btn-ghost btn' onClick={toggleDrawer}>
        <HamburgerIcon id='Hamburger-icon' className='w-8 h-8' fill='currentColor' />
      </button>
    </div>
  )
}
