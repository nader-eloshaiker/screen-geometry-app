import Footer from '@components/footer/Footer'
import Header from '@components/header/Header'
import { useEffect } from 'react'
import ReactGA from 'react-ga'
import { Outlet, useLocation } from 'react-router-dom'

export const Root = () => {
  const location = useLocation()
  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search)
  }, [location])
  return (
    <div id='app-root' className='container mx-auto flex min-h-screen flex-col'>
      <Header />
      <main role='main' className='my-6 flex-1 px-2 md:px-6 xl:px-2'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
