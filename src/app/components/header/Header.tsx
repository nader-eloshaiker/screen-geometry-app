import ThemeModeToggle from '@app/components/theme/ThemeModeToggle'
import { RouteSchema } from '@app/routes/RouteSchema'
import { clsx } from 'clsx'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HamburgerMenu } from './HamburgerMenu'

type NavMenuItemProps = { pathname: string; route: string; title: string }
const NavMenuItem = ({ pathname, route, title }: NavMenuItemProps) => {
  return (
    <motion.li variants={menuItemVariants}>
      <Link
        className={clsx('text-sm sm:text-base', {
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

export default function Header() {
  const { pathname } = useLocation()
  const [mainMenu, setMainMenu] = useState(false)

  return (
    <header className='sidebar'>
      <div className='container mx-auto'>
        {/* small header */}
        <div className='flex w-full flex-row xs:hidden' data-testid='small-header'>
          <div data-testid='nav-menu'>
            <div className='btn btn-square btn-ghost'>
              <HamburgerMenu width={20} height={14} isOpen={mainMenu} onClick={() => setMainMenu(!mainMenu)} />
            </div>
            <AnimatePresence mode='wait'>
              {mainMenu && (
                <motion.ul
                  style={{ originX: 0, originY: 0 }}
                  className='menu menu-sm absolute z-[1] ml-2 mt-3 w-52 rounded-box bg-base-100 p-2 shadow-lg'
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
          <div className='flex-1 pt-2 text-center text-2xl'>{import.meta.env.VITE_APP_TITLE}</div>
          <ThemeModeToggle
            className='mr-2 opacity-50 transition duration-500 ease-in-out hover:opacity-100'
            id='themeToggleTiny'
          />
        </div>
        {/* large header */}
        <div className='hidden pt-2 text-center text-2xl xs:block' data-testid='large-header-title'>
          {import.meta.env.VITE_APP_TITLE}
        </div>
        <div className='navbar hidden justify-between px-3 xs:flex' data-testid='large-header-menu'>
          <ul className='menu menu-horizontal gap-2 rounded-box p-0 transition-all duration-200 ease-out'>
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
