import ThemeModeToggle from '../theme/ThemeModeToggle'

export default function Header() {
  return (
    <>
      <div className='header grid place-content-center pt-2 text-xl'>Screen Geometry</div>
      <div className='sidebar sticky top-0 z-10 rounded-b-xl'>
        <header>
          <div className='flex items-center justify-between px-3 py-2 lg:px-4'>
            <ul className='flex list-none justify-center gap-4'>
              <li>
                <a href='/'>Home</a>
              </li>
              <li>
                <a href='/about'>About</a>
              </li>
              <li>
                <a href='/contact'>Contact</a>
              </li>
            </ul>
            <ThemeModeToggle title='Dark Mode' className='lightModeText' />
          </div>
        </header>
      </div>
    </>
  )
}
