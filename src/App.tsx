import ThemeModeToggle from './components/ThemeMode/ThemeModeToggle'

function App() {
  return (
    <div className='flex flex-col items-center min-h-screen gap-10 p-24'>
      <ThemeModeToggle title='Dark Mode' />
      <div style={{ textAlign: 'center' }}>
        <h1 className='text-3xl font-bold text-darkGreen dark:text-lightGreen'>GeeksforGeeks</h1>
        <h3 className='text-2xl'>Adding Dark Mode in ReactJS using Tailwind CSS</h3>
      </div>
      <center>
        <div className='w-56 overflow-hidden bg-white border border-gray-200 rounded-lg shadow-md dark:border-gray-700 dark:bg-gray-800'>
          <img
            className='rounded-t-lg'
            src='https://media.geeksforgeeks.org/wp-content/uploads/20220221132017/download.png'
            alt='gfg'
          />
          <div className='p-5'>
            <a href='##'>
              <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>GeeksforGeeks</h5>
            </a>
            ß
            <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
              Best coding website for developers in the world.
            </p>
          </div>
        </div>
      </center>
    </div>
  )
}

export default App
