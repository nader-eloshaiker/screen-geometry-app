import { useDrawerContext } from '../../contexts/drawer/useDrawerContext'
import SideNav from '../sidenav/SideNav'
import './DrawerLayout.css'

export const sideNavId = 'sidenav-drawer'

export default function DrawerLayout({ children }: TReactChildren) {
  const drawerRef = useDrawerContext()

  return (
    <div className='drawer my-6 grow lg:drawer-open'>
      <input id={sideNavId} type='checkbox' className='drawer-toggle' ref={drawerRef} />
      <div id='drawer-content' className='drawer-content h-full lg:mx-6'>
        {children}
      </div>
      <div className='drawer-side absolute h-full w-auto'>
        <label htmlFor={sideNavId} className='drawer-overlay'></label>
        <SideNav />
      </div>
    </div>
  )
}
