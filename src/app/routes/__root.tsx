import Footer from '@/app/components/footer/Footer'
import Header from '@/app/components/header/Header'
import { Toaster } from '@/lib/ui/components/toaster/Toaster'
import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router'
import { useEffect } from 'react'
import ReactGA from 'react-ga4'

const Root = () => {
  const location = useLocation()
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname + location.searchStr, title: location.pathname })
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

export const Route = createRootRoute({
  component: () => <Root />,
})
