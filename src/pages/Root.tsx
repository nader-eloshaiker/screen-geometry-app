import { useContext, useEffect } from 'react'
import { Outlet, useNavigation } from 'react-router-dom'
import { routes } from '../components/api/ApiRouteSchema'
import { ActionTypes, DataContext } from '../components/api/DataProvider'
import { TScreenListResponse } from '../components/api/db/indexApi'
import useAxios from '../components/api/fetch/useAxios'
import Footer from '../components/Footer'
import DrawerLayout from '../components/sidebar/DrawerLayout'
import DrawerProvider from '../components/sidebar/DrawerProvider'
import Header from '../components/topbar/Header'

export default function Root() {
  const navigation = useNavigation()
  const [_, dispatch] = useContext(DataContext)
  const [{ response, loading, error }] = useAxios<{ payload: TScreenListResponse }>({
    url: `${routes.baseUrl}${routes.root}/${routes.screens.path}`,
    method: 'GET',
  })
  useEffect(() => {
    if (response && !loading && !error) {
      dispatch({ type: ActionTypes.LOAD, payload: response.data.payload })
    }
  }, [loading, error, response])

  return (
    <DrawerProvider>
      <div className='container flex flex-col justify-center min-h-screen mx-auto'>
        <Header />
        <DrawerLayout>
          <main id='detail' className='grow'>
            {navigation.state === 'loading' || loading ? (
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
