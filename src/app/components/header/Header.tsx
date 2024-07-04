import { RouteSchema } from '@app/routes/RouteSchema'
import { clsx } from 'clsx'
import { motion, Variants } from 'framer-motion'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeModeToggle from '../theme/ThemeModeToggle'
import { HamburgerMenu } from './HamburgerMenu'

const menuVariants: Variants = {
  opened: {
    scaleY: 1,
    x: 0,
    transition: {
      when: 'beforeChildren',
    },
  },
  closed: {
    scaleY: 0,
    x: 0,
    transition: {
      when: 'afterChildren',
    },
  },
}

const menuItemVariants: Variants = {
  opened: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      duration: 0.2,
    },
  },
}

type NavMenuItemProps = { pathname: string; route: string; title: string }
const NavMenuItem = ({ pathname, route, title }: NavMenuItemProps) => {
  return (
    <motion.li variants={menuItemVariants}>
      <Link
        className={clsx('text-base', {
          active: pathname === route,
        })}
        to={route}
        data-testid={`link-${title}`}
      >
        {title}
      </Link>
    </motion.li>
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

const ThemeToggle = ({ id }: { id: string }) => (
  <ThemeModeToggle className='opacity-50 hover:opacity-100 md:mr-2' id={id} />
)

const Title = ({ size }: { size: 'sm' | 'lg' }) => (
  <div
    className={clsx('flex-1 pt-2 text-center text-accent-content', {
      'text-2xl': size === 'lg',
      'text-xl': size === 'sm',
    })}
  >
    {import.meta.env.VITE_APP_TITLE}
  </div>
)

export default function Header() {
  const { pathname } = useLocation()
  const [menuOpened, setMainMenu] = useState(false)

  return (
    <header className='container mx-auto rounded-b-md bg-accent text-accent-content shadow-md'>
      {/* small header */}
      <div className='flex w-full justify-between p-4 py-2 md:hidden' data-testid='small-header'>
        <motion.details
          data-testid='nav-menu'
          className={clsx('dropdown dropdown-bottom', { 'dropdown-open': menuOpened })}
        >
          <summary tabIndex={0} className='btn btn-ghost p-0' role='button'>
            <HamburgerMenu width={20} height={14} isOpen={menuOpened} onClick={() => setMainMenu(!menuOpened)} />
          </summary>
          <motion.ul
            tabIndex={0}
            // style={{ originX: 0, originY: 0 }}
            className='menu dropdown-content z-[1] mt-4 w-40 gap-4 rounded-md bg-neutral text-neutral-content shadow'
            initial='closed'
            animate={menuOpened ? 'opened' : 'closed'}
            exit='closed'
            variants={menuVariants}
          >
            <NavMenu pathname={pathname} />
          </motion.ul>
        </motion.details>
        <Title size='sm' />
        <ThemeToggle id='themeToggleTiny' />
      </div>
      {/* large header */}
      <div className='hidden p-4 md:flex md:flex-col' data-testid='large-header'>
        <Title size='lg' />
        <div className='navbar min-h-0 justify-between p-0' data-testid='large-header-menu'>
          <ul className=' menu menu-horizontal gap-4 bg-accent p-0'>
            <NavMenu pathname={pathname} />
          </ul>
          <ThemeToggle id='themeToggle' />
        </div>
      </div>
    </header>
  )
}
