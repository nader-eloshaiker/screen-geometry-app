import HamburgerIcon from '@local/assets/icons/Hamburger'
import ThemeModeToggle from '@local/components/theme/ThemeModeToggle'
import { RouteSchema } from '@local/routes/RouteSchema'
import { clsx } from 'clsx'
import { Link, useLocation } from 'react-router-dom'

type NavMenuItemProps = { pathname: string; route: string; title: string }
const NavMenuItem = ({ pathname, route, title }: NavMenuItemProps) => {
  return (
    <li>
      <Link className={clsx('text-sm sm:text-base', { active: pathname === route })} to={route}>
        {title}
      </Link>
    </li>
  )
}

type NavMenuProps = { pathname: string }
const NavMenu = ({ pathname }: NavMenuProps) => {
  return (
    <>
      <NavMenuItem pathname={pathname} route={RouteSchema.root.path} title='Home' />
      <NavMenuItem pathname={pathname} route={RouteSchema.screens.path} title='Screens' />
      <NavMenuItem pathname={pathname} route={RouteSchema.contact.path} title='Contact' />
      <NavMenuItem pathname={pathname} route={RouteSchema.help.path} title='Help' />
    </>
  )
}

export default function Header() {
  const { pathname } = useLocation()

  return (
    <header className='sidebar'>
      <div className='container mx-auto'>
        {/* small header */}
        <div className='flex w-full flex-row xs:hidden' data-testid='small-header'>
          <div className='dropdown' data-testid='nav-menu'>
            <div tabIndex={0} role='button' className='btn btn-square btn-ghost'>
              <HamburgerIcon className='size-6' />
            </div>
            <ul
              tabIndex={0}
              className='menu dropdown-content menu-sm z-[1] ml-2 mt-3 w-52 rounded-box bg-base-100 p-2 shadow-lg'
            >
              <NavMenu pathname={pathname} />
            </ul>
          </div>
          <div className='flex-1 pt-2 text-center text-2xl'>{import.meta.env.VITE_APP_TITLE}</div>
          <ThemeModeToggle
            className='mr-2 opacity-50 transition duration-500 ease-in-out hover:opacity-100'
            id='themeToggleTiny'
          />
        </div>
        {/* large header */}
        <div className='hidden pt-2 text-center text-2xl  xs:block' data-testid='large-header-title'>
          {import.meta.env.VITE_APP_TITLE}
        </div>
        <div className='navbar hidden justify-between px-3  xs:flex' data-testid='large-header-menu'>
          <ul className='menu menu-horizontal gap-2 rounded-box p-0'>
            <NavMenu pathname={pathname} />
          </ul>
          <ThemeModeToggle
            className='mr-2 opacity-50 transition duration-500 ease-in-out hover:opacity-100'
            id='themeToggle'
          />
        </div>
      </div>
    </header>
  )
}
