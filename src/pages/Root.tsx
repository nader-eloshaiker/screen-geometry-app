import Footer from '@components/footer/Footer'
import Header from '@components/header/Header'
import { Outlet } from 'react-router-dom'

export const Root = () => {
  return (
    <div id='app-root' className='container mx-auto flex min-h-screen flex-col'>
      <Header />
      <main role='main' className='my-6 flex-1 px-2 md:px-6 xl:px-2'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
