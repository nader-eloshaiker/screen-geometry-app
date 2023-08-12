import './DrawerLayout.css'
import SideNav from './SideNav'
import { useDrawerContext } from './context/useDrawerContext'

export const sideNavId = 'sidenav-drawer'

export default function DrawerLayout({ children }: TReactChildren) {
  const drawerRef = useDrawerContext()

  return (
    <div className='my-6 drawer grow lg:drawer-open'>
      <input id={sideNavId} type='checkbox' className='drawer-toggle' ref={drawerRef} />
      <div className='flex flex-col items-center justify-center drawer-content'>{children}</div>
      <div className='absolute w-auto h-full drawer-side'>
        <label htmlFor={sideNavId} className='drawer-overlay'></label>
        <SideNav />
      </div>
    </div>
  )
}
