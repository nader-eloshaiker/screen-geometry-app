import { TranslateMessage } from '@/app/stores/translation'
import { Alert, AlertDescription, AlertTitle } from '@screengeometry/lib-ui/alert'
import { Button } from '@screengeometry/lib-ui/button'
import { Card } from '@screengeometry/lib-ui/card'
import { AlertCircle } from 'lucide-react'

export const NotFoundPage = () => {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <Card className='w-full max-w-lg p-6 shadow-xl'>
        {/* Error Message */}
        <Alert palette='danger' className='mb-6'>
          <AlertCircle className='size-6' />
          <AlertTitle className='text-xl font-bold'>
            <TranslateMessage id='notfound.alert.title' />
          </AlertTitle>
          <AlertDescription className='text-lg'>
            <TranslateMessage id='notfound.alert.message' />
          </AlertDescription>
        </Alert>

        {/* Troubleshooting Steps */}
        <div className='space-y-4 text-left'>
          <h3 className='text-lg font-semibold'>
            <TranslateMessage id='notfound.content.heading' />
          </h3>
          <ul className='list-inside list-disc'>
            <li>
              <TranslateMessage id='notfound.content.l1' />
            </li>
            <li>
              <TranslateMessage id='notfound.content.l2' />
            </li>
            <li>
              {' '}
              <TranslateMessage id='notfound.content.l3' />
            </li>
          </ul>
        </div>

        {/* Call to Action Button */}
        <div className='mt-8'>
          <Button palette='danger' mode='outline' className='shadow-lg' onClick={() => (window.location.href = '/')}>
            <TranslateMessage id='notfound.button.homepage' />
          </Button>
        </div>
      </Card>
    </div>
  )
}
