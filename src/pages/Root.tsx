import { useContext, useEffect } from 'react'
import { Outlet, useNavigation } from 'react-router-dom'
import { useListScreensAction } from '../components/api/actions/useListScreensAction'
import Footer from '../components/Footer'
import { DrawerProvider } from '../components/sidebar/DrawerContext'
import DrawerLayout from '../components/sidebar/DrawerLayout'
import Header from '../components/topbar/Header'
import { AppContext } from '../contexts/AppContext'
import { SearchActionTypes, SearchContext } from '../contexts/SearchContext'

export default function Root() {
  const navigation = useNavigation()
  const [dataState] = useContext(AppContext)
  const [_, dispatch] = useContext(SearchContext)

  useListScreensAction()

  useEffect(() => {
    fetch('db/monitor.json')
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: SearchActionTypes.LOAD, payload: data })
      })
  }, [])

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
