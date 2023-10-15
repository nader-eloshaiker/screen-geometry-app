import ThemeModeToggle from '../theme/ThemeModeToggle'

export default function Header() {
  return (
    <>
      <div className='header grid place-content-center pt-2 text-2xl'>Screen Geometry</div>
      <div className='sidebar sticky top-0 z-10 rounded-b-xl px-2'>
        <header>
          <div className='flex items-center justify-between py-4 lg:px-4'>
            <ul className='flex list-none justify-center gap-6'>
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
