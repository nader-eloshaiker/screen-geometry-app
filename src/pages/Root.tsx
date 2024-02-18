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
    <div className='flex min-h-dvh flex-col'>
      <Header />
      <main id='app-root' className='container mx-auto my-6 flex-auto px-2 md:px-4 xl:px-0'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
