import { useRef } from 'react'
import { DrawerContext, TSidebarRef } from './DrawerContext'

export const DrawerProvider = ({ children }: TReactChildren) => {
  const drawerRef = useRef<TSidebarRef>(null)

  return drawerRef ? <DrawerContext.Provider value={drawerRef}>{children}</DrawerContext.Provider> : null
}