import cn from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { routes } from '../../routes/AppRouteSchema'
import ThemeModeToggle from '../theme/ThemeModeToggle'

export default function Header() {
  const { pathname } = useLocation()

  return (
    <header className='sidebar rounded-b-xl'>
      <div className='grid place-content-center pt-2 text-2xl'>{import.meta.env.VITE_APP_TITLE}</div>
      <div className='navbar justify-between'>
        <ul className='menu menu-horizontal gap-4 rounded-box'>
          <li>
            <Link
              className={cn('atext-sm sm:text-base', { active: pathname === routes.root.path })}
              to={routes.root.path}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={cn('atext-sm sm:text-base', { active: pathname === routes.about.path })}
              to={routes.about.path}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className={cn('atext-sm sm:text-base', { active: pathname === routes.contact.path })}
              to={routes.contact.path}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              className={cn('atext-sm sm:text-base', { active: pathname === routes.help.path })}
              to={routes.help.path}
            >
              Help
            </Link>
          </li>
        </ul>
        <ThemeModeToggle title='Dark Mode' className='lightModeText btn btn-ghost' />
      </div>
    </header>
  )
}
