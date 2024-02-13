import Footer from '@components/footer/Footer'
import Header from '@components/header/Header'
import { useEffect } from 'react'
import ReactGA from 'react-ga4'
import { Outlet, useLocation } from 'react-router-dom'

export const Root = () => {
  const location = useLocation()
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search, title: location.pathname })
  }, [location])
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <div id='app-root' className='container mx-auto grow'>
        <main role='main' className='my-6 size-full px-2 md:px-6 xl:px-2'>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}
