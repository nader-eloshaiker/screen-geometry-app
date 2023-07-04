import { useContext } from 'react'
import { Context } from './SidebarProvider'
import SideNav from './SideNav'

export const sideNavId = 'sidenav-drawer'

export default function DrawerLayout({ children }: TReactChildren) {
  const drawerRef = useContext(Context)

  return (
    <div className='top-auto my-6 drawer grow lg:drawer-open'>
      <input id={sideNavId} type='checkbox' className='drawer-toggle' ref={drawerRef} />
      <div className='flex flex-col items-center justify-center drawer-content'>{children}</div>
      <div className='top-auto w-auto h-full drawer-side'>
        <label htmlFor={sideNavId} className='top-auto drawer-overlay'></label>
        <SideNav />
      </div>
    </div>
  )
}
