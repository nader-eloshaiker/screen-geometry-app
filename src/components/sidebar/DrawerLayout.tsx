import { useContext } from 'react'
import Sidebar from './Sidebar'
import { Context } from './SidebarProvider'

export const sideNavId = 'sidenav-drawer'

export default function DrawerLayout({ children }: TReactChildren) {
  const drawerRef = useContext(Context)
  return (
    <div className='drawer grow lg:drawer-open'>
      <input id={sideNavId} type='checkbox' className='drawer-toggle' ref={drawerRef} />
      <div className='drawer-content flex flex-col items-center justify-center'>{children}</div>
      <div className='drawer-side h-full'>
        <label htmlFor={sideNavId} className='drawer-overlay'></label>
        <Sidebar />
      </div>
    </div>
  )
}
