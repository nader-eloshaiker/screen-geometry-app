import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'

export default function Root() {
  return (
    <div id='app-root' className='container mx-auto flex h-screen min-h-screen flex-col overflow-hidden'>
      <Header />
      <main role='main' className='my-6 h-full flex-1 overflow-y-auto px-2 md:px-6 xl:px-2'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
