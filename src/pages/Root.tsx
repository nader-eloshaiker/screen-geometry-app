import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'

export default function Root() {
  return (
    <div id='app-root' className='container mx-auto flex-1'>
      <div className='flex min-h-screen flex-col flex-wrap'>
        <Header />
        <main role='main' className='flex-1 px-4'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}
