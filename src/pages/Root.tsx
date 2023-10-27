import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'

export default function Root() {
  return (
    <div id='app-root' className='container mx-auto flex h-full min-h-screen w-full flex-col'>
      <Header />
      <main role='main' className='flex-1 px-2 sm:px-4'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
