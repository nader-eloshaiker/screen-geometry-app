import { createContext, MutableRefObject, useRef } from 'react'

type TSidebarRef = HTMLInputElement | null
type TSidebarContext = MutableRefObject<TSidebarRef>
export const Context = createContext<TSidebarContext>({} as TSidebarContext)

export default function SidebarProvider({ children }: TReactChildren) {
  const drawerRef = useRef<TSidebarRef>(null)

  return drawerRef ? <Context.Provider value={drawerRef}>{children}</Context.Provider> : null
}
