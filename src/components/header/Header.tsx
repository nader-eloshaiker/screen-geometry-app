import cn from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import HamburgerIcon from '../../assets/icons/Hamburger'
import { appRoutes } from '../../routes/AppRouteSchema'
import ThemeModeToggle from '../theme/ThemeModeToggle'

type NavMenuItemProps = { pathname: string; route: string; title: string }
const NavMenuItem = ({ pathname, route, title }: NavMenuItemProps) => {
  return (
    <li>
      <Link className={cn('atext-sm sm:text-base', { active: pathname === route })} to={route}>
        {title}
      </Link>
    </li>
  )
}

type NavMenuProps = { pathname: string }
const NavMenu = ({ pathname }: NavMenuProps) => {
  return (
    <>
      <NavMenuItem pathname={pathname} route={appRoutes.root.path} title='Home' />
      <NavMenuItem pathname={pathname} route={appRoutes.screens.path} title='Screens' />
      <NavMenuItem pathname={pathname} route={appRoutes.contact.path} title='Contact' />
      <NavMenuItem pathname={pathname} route={appRoutes.help.path} title='Help' />
    </>
  )
}

export default function Header() {
  const { pathname } = useLocation()

  return (
    <header className='sidebar rounded-b-xl'>
      {/* small header */}
      <div className='flex w-full flex-row xs:hidden'>
        <div className='dropdown'>
          <label tabIndex={0} className='btn btn-square btn-ghost'>
            <HamburgerIcon className='h-6 w-6' />
          </label>
          <ul
            tabIndex={0}
            className='menu dropdown-content menu-sm z-[1] ml-2 mt-3 w-52 rounded-box bg-base-100 p-2 shadow-lg'
          >
            <NavMenu pathname={pathname} />
          </ul>
        </div>
        <div className='flex-1 pt-2 text-center text-2xl'>{import.meta.env.VITE_APP_TITLE}</div>
        <ThemeModeToggle className='mr-2 opacity-50 transition duration-500 ease-in-out hover:opacity-100' />
      </div>
      {/* large header */}
      <div className='hidden pt-2 text-center text-2xl  xs:block'>{import.meta.env.VITE_APP_TITLE}</div>
      <div className='navbar hidden justify-between px-3  xs:flex'>
        <ul className='menu menu-horizontal gap-4 rounded-box p-0'>
          <NavMenu pathname={pathname} />
        </ul>
        <ThemeModeToggle className='mr-2 opacity-50 transition duration-500 ease-in-out hover:opacity-100' />
      </div>
    </header>
  )
}
