import { Outlet } from 'react-router-dom'
import DrawerLayout from '../components/drawerlayout/DrawerLayout'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import { useAppContext } from '../contexts/App/useAppContext'
import { DrawerProvider } from '../contexts/drawer/DrawerProvider'
import { Loading } from './Loading'

export default function Root() {
  const [{ loading }] = useAppContext()

  return (
    <DrawerProvider>
      <div id='app-root' className='container mx-auto'>
        <div className='flex flex-col flex-wrap min-h-screen'>
          <Header />
          <DrawerLayout>
            <main role='main' className='w-full h-full'>
              {loading ? <Loading /> : <Outlet />}
            </main>
          </DrawerLayout>
          <Footer />
        </div>
      </div>
    </DrawerProvider>
  )
}
