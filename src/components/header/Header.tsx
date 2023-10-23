import { Link } from 'react-router-dom'
import { routes } from '../../routes/AppRouteSchema'
import ThemeModeToggle from '../theme/ThemeModeToggle'

export default function Header() {
  return (
    <>
      <div className='header grid place-content-center pt-2 text-2xl'>{import.meta.env.VITE_APP_TITLE}</div>
      <div className='sidebar sticky top-0 z-10 rounded-b-xl px-2'>
        <header>
          <div className='flex items-center justify-between py-4 lg:px-4'>
            <ul className='flex list-none justify-center gap-6'>
              <li>
                <Link to={routes.root.path}>Home</Link>
              </li>
              <li>
                <Link to={routes.about.path}>About</Link>
              </li>
              <li>
                <Link to={routes.contact.path}>Contact</Link>
              </li>
              <li>
                <Link to={routes.help.path}>Help</Link>
              </li>
            </ul>
            <ThemeModeToggle title='Dark Mode' className='lightModeText' />
          </div>
        </header>
      </div>
    </>
  )
}
