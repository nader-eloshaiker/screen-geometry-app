import { Helmet } from 'react-helmet'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

export const ErrorManager = () => {
  const error = useRouteError()

  let errorMessage: string

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.data?.message || error.statusText
  } else if (error instanceof Error) {
    errorMessage = error.message
  } else if (typeof error === 'string') {
    errorMessage = error
  } else {
    console.error(error)
    errorMessage = 'Unknown error'
  }

  return (
    <>
      <Helmet>
        <title>Service Error - Screen Geometry</title>
        <meta name='description' content='A service error has occured' />
      </Helmet>

      <div className='flex h-full flex-row justify-center px-2 md:px-6 xl:px-2'>
        <div className='mockup-code w-96'>
          <pre data-prefix='1'>
            <code>Dang it! A Service Error has occured 😵‍💫</code>
          </pre>
          <pre data-prefix='2'>
            <code></code>
          </pre>
          <pre data-prefix='3' className='bg-warning text-warning-content'>
            <code>{errorMessage}</code>
          </pre>
        </div>
      </div>
    </>
  )
}
