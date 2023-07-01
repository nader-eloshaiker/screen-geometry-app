import { useContext } from 'react'
import HamburgerIcon from './icons/Hamburger'
import { Context } from './sidebar/SidebarProvider'
import ThemeModeToggle from './theme/ThemeModeToggle'

export default function Header() {
  const drawerRef = useContext(Context)

  const toggleDrawer = () => {
    drawerRef?.current?.click()
  }

  return (
    <>
      <div className='grid h-40 place-content-center bg-indigo-800 text-gray-50'>
        <h1 className='text-2xl'>Sage Screen Geometry</h1>
      </div>
      <div className='sticky top-0 bg-indigo-600 text-indigo-50'>
        <header>
          <div className='flex items-center justify-between px-4 py-2'>
            <div className='flex flex-row items-center gap-4'>
              <button
                className='btn-ghost btn p-2 py-0 text-indigo-200 dark:text-indigo-900 lg:hidden'
                onClick={toggleDrawer}
              >
                <HamburgerIcon id='Hamburger-icon' className='h-8 w-8' fill='currentColor' />
              </button>
              <ul className='flex list-none justify-center gap-4'>
                <li>Home</li>
                <li>Blog</li>
                <li>About</li>
                <li>Contact</li>
              </ul>
            </div>
            <ThemeModeToggle title='Dark Mode' />
          </div>
        </header>
      </div>
    </>
  )
}
