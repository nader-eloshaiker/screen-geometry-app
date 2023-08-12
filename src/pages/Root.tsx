import { Outlet, useNavigation } from 'react-router-dom'
import { useListScreensAction } from '../components/api/actions/useListScreensAction'
import Footer from '../components/Footer'
import DrawerLayout from '../components/sidebar/DrawerLayout'
import Header from '../components/topbar/Header'
import { useAppContext } from '../contexts/App/useAppContext'
import { DrawerProvider } from '../components/sidebar/context/DrawerProvider'

export default function Root() {
  const navigation = useNavigation()
  const [dataState] = useAppContext()

  useListScreensAction()

  return (
    <DrawerProvider>
      <div className='container flex flex-col justify-center min-h-screen mx-auto'>
        <Header />
        <DrawerLayout>
          <main id='detail' className='grow'>
            {navigation.state === 'loading' || dataState.loading ? (
              <span className='text-indigo-600 loading loading-bars loading-lg'></span>
            ) : (
              <Outlet />
            )}
          </main>
        </DrawerLayout>
        <Footer />
      </div>
    </DrawerProvider>
  )
}
