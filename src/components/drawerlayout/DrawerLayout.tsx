import { useDrawerContext } from '../../contexts/drawer/useDrawerContext'
import SideNav from '../sidenav/SideNav'
import './DrawerLayout.css'

export const sideNavId = 'sidenav-drawer'

export default function DrawerLayout({ children }: TReactChildren) {
  const drawerRef = useDrawerContext()

  return (
    <div className='my-6 drawer grow lg:drawer-open'>
      <input id={sideNavId} type='checkbox' className='drawer-toggle' ref={drawerRef} />
      <div id='drawer-content' className='h-full drawer-content lg:mx-6'>
        {children}
      </div>
      <div className='absolute w-auto h-full drawer-side'>
        <label htmlFor={sideNavId} className='drawer-overlay'></label>
        <SideNav />
      </div>
    </div>
  )
}
