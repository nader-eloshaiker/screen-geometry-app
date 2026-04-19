import { TranslateMessage } from '@/app/stores/translation'
import { Alert, AlertDescription, AlertTitle } from '@screengeometry/lib-ui/alert'
import { Button } from '@screengeometry/lib-ui/button'
import { Card } from '@screengeometry/lib-ui/card'
import { AlertCircle } from 'lucide-react'

export const ErrorFallbackPage = ({ error }: { error: Error | { message: string } }) => {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <Card className='w-full max-w-lg p-6 shadow-xl'>
        {/* Error Message */}
        <Alert palette='danger' className='mb-6'>
          <AlertCircle className='size-6' />
          <AlertTitle className='text-xl font-bold'>
            <TranslateMessage id='errorfallback.alert.title' />
          </AlertTitle>
          <AlertDescription className='text-lg'>{error.message}</AlertDescription>
        </Alert>
        {/* Call to Action Button */}
        <div className='mt-8'>
          <Button palette='danger' mode='outline' className='shadow-lg' onClick={() => (window.location.href = '/')}>
            <TranslateMessage id='errorfallback.button.homepage' />
          </Button>
        </div>
      </Card>
    </div>
  )
}
