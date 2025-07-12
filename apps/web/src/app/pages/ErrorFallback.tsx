import { Alert, AlertDescription, AlertTitle } from '@screengeometry/lib-ui/alert'
import { Button } from '@screengeometry/lib-ui/button'
import { Card } from '@screengeometry/lib-ui/card'
import { AlertCircle } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

export const ErrorFallback = ({ error }: { error: Error | { message: string } }) => {
  return (
    <>
      <Helmet>
        <title>Screen Geometry: Error</title>
        <meta name='description' content='A service error has occured' />
      </Helmet>
      <div className='flex min-h-screen items-center justify-center'>
        <Card className='w-full max-w-lg p-6 shadow-xl'>
          {/* Error Message */}
          <Alert palette='danger' className='mb-6'>
            <AlertCircle className='size-6' />
            <AlertTitle className='text-xl font-bold'>Oops! Something went wrong.</AlertTitle>
            <AlertDescription className='text-lg'>{error.message}</AlertDescription>
          </Alert>
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
