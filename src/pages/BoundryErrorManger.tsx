import Footer from '@components/footer/Footer'
import Header from '@components/header/Header'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

const RootBoundary = () => {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <span>This page does not exist!</span>
    }

    if (error.status === 401) {
      return <span>You are nor authorized to see this</span>
    }

    if (error.status === 503) {
      return <span>Looks like our API is down</span>
    }

    if (error.status === 418) {
      return <span>🫖</span>
    }
  }

  return <div>Something went wrong</div>
}

export const BoundyErrorManager = () => {
  return (
    <div id='app-root' className='container mx-auto flex size-full min-h-screen flex-col justify-between'>
      <Header />
      <main role='main' className='my-6 flex h-full flex-col justify-center px-2 md:px-6 xl:px-2'>
        <div className='flex h-full flex-row justify-center px-2 md:px-6 xl:px-2'>
          <div className='mockup-code w-96'>
            <pre data-prefix='1'>
              <code>An Error has occured</code>
            </pre>
            <pre data-prefix='2'>
              <code></code>
            </pre>
            <pre data-prefix='3' className='bg-warning text-warning-content'>
              <code>
                <RootBoundary />
              </code>
            </pre>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
