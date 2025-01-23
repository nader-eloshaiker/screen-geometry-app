import { Alert, AlertDescription, AlertTitle } from '@/lib/ui/components/alert/Alert'
import { Button } from '@/lib/ui/components/button/Button'
import { Card } from '@/lib/ui/components/card/Card'
import { AlertCircle } from 'lucide-react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

export const ErrorManager = () => {
  const error = useRouteError()

  useEffect(() => {
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

    console.error(errorMessage)
  }, [error])

  return (
    <>
      <Helmet>
        <title>Screen Geometry: Service Error</title>
        <meta name='description' content='A service error has occured' />
      </Helmet>
      <div className='flex min-h-screen items-center justify-center bg-gray-100'>
        <Card className='w-full max-w-lg rounded-lg bg-white p-6 shadow-xl'>
          {/* Error Message */}
          <Alert palette='danger' className='mb-6'>
            <AlertCircle className='size-6' />
            <AlertTitle className='text-xl font-bold'>Oops! Something went wrong.</AlertTitle>
            <AlertDescription className='text-lg'>
              It seems there was an issue while processing your request. Please try the following steps:
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
