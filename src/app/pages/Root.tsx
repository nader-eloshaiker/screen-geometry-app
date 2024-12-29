import Footer from '@/app/components/footer/Footer'
import Header from '@/app/components/header/Header'
import { Toaster } from '@/lib/ui/components/toaster/Toaster'
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
      <main id='app-root' className='container mx-auto my-6 flex-auto px-1 2xs:px-2 md:px-4'>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}
