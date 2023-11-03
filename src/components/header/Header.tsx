import { Link } from 'react-router-dom'
import { routes } from '../../routes/AppRouteSchema'
import ThemeModeToggle from '../theme/ThemeModeToggle'

export default function Header() {
  return (
    <header className='sidebar rounded-b-xl px-4 py-2 md:px-6'>
      <div className='grid place-content-center pt-2 text-2xl'>{import.meta.env.VITE_APP_TITLE}</div>
      <div className='flex items-center justify-between'>
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
  )
}
