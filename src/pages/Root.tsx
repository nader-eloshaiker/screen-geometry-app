import { Outlet } from 'react-router-dom'
import { useListScreensAction } from '../api/actions/useListScreensAction'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import { DrawerProvider } from '../contexts/drawer/DrawerProvider'
import DrawerLayout from '../components/drawerlayout/DrawerLayout'
import { useAppContext } from '../contexts/App/useAppContext'
import { Loading } from './Loading'

export default function Root() {
  const [dataState] = useAppContext()

  useListScreensAction()

  return (
    <DrawerProvider>
      <div id='app-root' className='container mx-auto'>
        <div className='flex flex-col flex-wrap min-h-screen'>
          <Header />
          <DrawerLayout>
            <main role='main' className='w-full h-full'>
              {dataState.loading ? <Loading /> : <Outlet />}
            </main>
          </DrawerLayout>
          <Footer />
        </div>
      </div>
    </DrawerProvider>
  )
}
