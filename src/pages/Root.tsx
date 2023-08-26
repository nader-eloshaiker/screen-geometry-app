import { Outlet } from 'react-router-dom'
import DrawerLayout from '../components/drawerlayout/DrawerLayout'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import { DrawerProvider } from '../contexts/drawer/DrawerProvider'

export default function Root() {
  return (
    <DrawerProvider>
      <div id='app-root' className='container mx-auto'>
        <div className='flex min-h-screen flex-col flex-wrap'>
          <Header />
          <DrawerLayout>
            <main role='main' className='h-full w-full'>
              <Outlet />
            </main>
          </DrawerLayout>
          <Footer />
        </div>
      </div>
    </DrawerProvider>
  )
}
