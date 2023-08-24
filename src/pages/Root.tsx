import { Outlet } from 'react-router-dom'
import DrawerLayout from '../components/drawerlayout/DrawerLayout'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import { DrawerProvider } from '../contexts/drawer/DrawerProvider'

export default function Root() {
  return (
    <DrawerProvider>
      <div id='app-root' className='container mx-auto'>
        <div className='flex flex-col flex-wrap min-h-screen'>
          <Header />
          <DrawerLayout>
            <main role='main' className='w-full h-full'>
              <Outlet />
            </main>
          </DrawerLayout>
          <Footer />
        </div>
      </div>
    </DrawerProvider>
  )
}
