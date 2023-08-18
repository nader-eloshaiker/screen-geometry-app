import { createContext, MutableRefObject } from 'react'

export type TSidebarRef = HTMLInputElement | null
type TSidebar = MutableRefObject<TSidebarRef>

export const DrawerContext = createContext<TSidebar>({} as TSidebar)
