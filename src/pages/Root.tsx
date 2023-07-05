import { Outlet, useNavigation } from 'react-router-dom'
import Footer from '../components/Footer'
import DrawerLayout from '../components/sidebar/DrawerLayout'
import SidebarProvider from '../components/sidebar/DrawerProvider'
import Header from '../components/topbar/Header'

export default function Root() {
  const navigation = useNavigation()

  return (
    <SidebarProvider>
      <div className='container flex flex-col justify-center min-h-screen mx-auto'>
        <Header />
        <DrawerLayout>
          <main id='detail' className='grow'>
            {navigation.state === 'loading' ? (
              <span className='text-indigo-600 loading loading-bars loading-lg'></span>
            ) : (
              <Outlet />
            )}
          </main>
        </DrawerLayout>
        <Footer />
      </div>
    </SidebarProvider>
  )
}
