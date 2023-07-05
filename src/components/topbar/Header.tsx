import ThemeModeToggle from '../theme/ThemeModeToggle'
import HamburgerButton from './HamburgerButton'

export default function Header() {
  return (
    <>
      <div className='grid h-10 header place-content-center'>
        <h1 className='text-3xl'>Sage Screen Geometry</h1>
      </div>
      <div className='sticky top-0 z-auto sidebar rounded-b-xl'>
        <header>
          <div className='flex items-center justify-between px-2 py-2 lg:px-4'>
            <div className='flex flex-row items-center gap-3'>
              <HamburgerButton className='lightModeText lg:hidden' />
              <ul className='flex justify-center gap-4 list-none'>
                <li>Home</li>
                <li>Blog</li>
                <li>About</li>
                <li>Contact</li>
              </ul>
            </div>
            <ThemeModeToggle title='Dark Mode' className='lightModeText' />
          </div>
        </header>
      </div>
    </>
  )
}
