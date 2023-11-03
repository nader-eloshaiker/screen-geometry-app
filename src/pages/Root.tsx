import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'

export default function Root() {
  return (
    <div id='app-root' className='container mx-auto flex h-full min-h-screen w-full flex-col'>
      <Header />
      <main role='main' className='my-6 flex-1'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
