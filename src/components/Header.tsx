import ThemeModeToggle from './ThemeMode/ThemeModeToggle'

export default function Header() {
  return (
    <>
      <div className='grid h-40 place-content-center bg-indigo-800 text-gray-50'>
        <h1 className='text-2xl'>Sage Screen Geometry</h1>
      </div>
      <div className='sticky top-0 bg-indigo-600 text-indigo-50'>
        <header>
          <div className='flex items-center justify-between'>
            <ul className='flex list-none justify-center gap-4'>
              <li className='p-4'>Home</li>
              <li className='p-4'>Blog</li>
              <li className='p-4'>About</li>
              <li className='p-4'>Contact</li>
            </ul>
            <ThemeModeToggle title='Dark Mode' />
          </div>
        </header>
      </div>
    </>
  )
}
