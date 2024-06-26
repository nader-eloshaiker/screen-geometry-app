import { RouteSchema } from '@app/routes/RouteSchema'
import { clsx } from 'clsx'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeModeToggle from '../theme/ThemeModeToggle'
import { HamburgerMenu } from './HamburgerMenu'

const menuVariants: Variants = {
  open: {
    scaleY: 1,
    x: 0,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    x: 0,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.1,
    },
  },
}

const menuItemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: 'beforeChildren',
      duration: 0.2,
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: 'afterChildren',
      duration: 0.2,
    },
  },
}

type NavMenuItemProps = { pathname: string; route: string; title: string }
const NavMenuItem = ({ pathname, route, title }: NavMenuItemProps) => {
  return (
    <motion.li variants={menuItemVariants}>
      <Link
        className={clsx('text-base hover:underline', {
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
  <ThemeModeToggle className='mr-2 opacity-50 transition duration-500 ease-in-out hover:opacity-100' id={id} />
)

const Title = ({ size }: { size: 'sm' | 'lg' }) => (
  <div className={clsx('flex-1 pt-2 text-center', { 'text-2xl': size === 'lg', 'text-xl': size === 'sm' })}>
    {import.meta.env.VITE_APP_TITLE}
  </div>
)

export default function Header() {
  const { pathname } = useLocation()
  const [mainMenu, setMainMenu] = useState(false)

  return (
    <header className='container mx-auto bg-primary text-primary-content'>
      {/* small header */}
      <div className='flex w-full justify-between p-2 md:hidden' data-testid='small-header'>
        <div data-testid='nav-menu'>
          <div tabIndex={0} className='btn btn-ghost' role='button'>
            <HamburgerMenu width={20} height={14} isOpen={mainMenu} onClick={() => setMainMenu(!mainMenu)} />
          </div>
          <AnimatePresence mode='wait'>
            {mainMenu && (
              <motion.ul
                tabIndex={0}
                style={{ originX: 0, originY: 0 }}
                className='menu menu-sm absolute z-[1] ml-2 mt-3 w-52 rounded-md bg-primary p-2 text-primary-content shadow-lg'
                initial='closed'
                animate='open'
                exit='closed'
                variants={menuVariants}
              >
                <NavMenu pathname={pathname} />
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
        <Title size='sm' />
        <ThemeToggle id='themeToggleTiny' />
      </div>
      {/* large header */}
      <div className='hidden pt-2 md:flex md:flex-col' data-testid='large-header-title'>
        <Title size='lg' />
        <div className='navbar justify-between px-3' data-testid='large-header-menu'>
          <ul className=' menu menu-horizontal gap-4 bg-primary'>
            <NavMenu pathname={pathname} />
          </ul>
          <ThemeToggle id='themeToggle' />
        </div>
      </div>
    </header>
  )
}
