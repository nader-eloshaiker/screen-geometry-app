import { Alert, AlertDescription, AlertTitle } from '@/lib/ui/components/alert/Alert'
import { Button } from '@/lib/ui/components/button/Button'
import { Card } from '@/lib/ui/components/card/Card'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

const RootBoundary = () => {
  const error = useRouteError()
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (isRouteErrorResponse(error)) {
      if (error.status === 404) {
        setErrorMessage('This page does not exist 🤮')
      }

      if (error.status === 401) {
        setErrorMessage('You are nor authorized to see this 😤')
      }

      if (error.status === 503) {
        setErrorMessage('Looks like our API is down 🥺')
      }

      if (error.status === 418) {
        setErrorMessage('The universe is broken 🫖')
      }
    } else {
      setErrorMessage('Unknown error has occured 🤔')
    }
  }, [error])

  return <span>{errorMessage}</span>
}

export const BoundyErrorManager = () => {
  return (
    <>
      <Helmet>
        <title>Service Error - Screen Geometry</title>
        <meta name='description' content='A service error has occured' />
      </Helmet>
      <div className='flex min-h-screen items-center justify-center bg-gray-100'>
        <Card className='w-full max-w-lg rounded-lg bg-white p-6 shadow-xl'>
          {/* Error Message */}
          <Alert palette='danger' className='mb-6'>
            <AlertTitle className='text-xl font-bold'>Oops! Something went wrong.</AlertTitle>
            <AlertDescription className='text-lg'>
              <RootBoundary />
            </AlertDescription>
          </Alert>

          {/* Troubleshooting Steps */}
          <div className='space-y-4 text-left text-gray-700'>
            <h3 className='text-lg font-semibold'>Try the following:</h3>
            <ul className='list-inside list-disc'>
              <li>Check your internet connection.</li>
              <li>Refresh the page.</li>
              <li>If the problem persists, please try using a Mac.</li>
            </ul>
          </div>

          {/* Call to Action Button */}
          <div className='mt-8'>
            <Button palette='danger' mode='outline' className='shadow-lg' onClick={() => (window.location.href = '/')}>
              Go to Homepage
            </Button>
          </div>
        </Card>
      </div>
    </>
  )
}
