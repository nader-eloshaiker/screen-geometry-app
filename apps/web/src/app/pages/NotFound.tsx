import { Alert, AlertDescription, AlertTitle } from '@screengeometry/lib-ui/alert'
import { Button } from '@screengeometry/lib-ui/button'
import { Card } from '@screengeometry/lib-ui/card'
import { AlertCircle } from 'lucide-react'
import { FormattedMessage } from 'react-intl'

export const NotFound = () => {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <Card className='w-full max-w-lg p-6 shadow-xl'>
        {/* Error Message */}
        <Alert palette='danger' className='mb-6'>
          <AlertCircle className='size-6' />
          <AlertTitle className='text-xl font-bold'>
            <FormattedMessage id='notfound.alert.title' defaultMessage='Oops! Something went wrong.' />
          </AlertTitle>
          <AlertDescription className='text-lg'>
            <FormattedMessage id='notfound.alert.message' defaultMessage='This page does not exist 🤮' />
          </AlertDescription>
        </Alert>

        {/* Troubleshooting Steps */}
        <div className='space-y-4 text-left'>
          <h3 className='text-lg font-semibold'>
            <FormattedMessage id='notfound.content.heading' defaultMessage='Try the following:' />
          </h3>
          <ul className='list-inside list-disc'>
            <li>
              <FormattedMessage id='notfound.content.l1' defaultMessage='Check your internet connection.' />
            </li>
            <li>
              <FormattedMessage id='notfound.content.l2' defaultMessage='Refresh the page.' />
            </li>
            <li>
              {' '}
              <FormattedMessage
                id='notfound.content.l3'
                defaultMessage='If the problem persists, please try using a Mac.'
              />
            </li>
          </ul>
        </div>

        {/* Call to Action Button */}
        <div className='mt-8'>
          <Button palette='danger' mode='outline' className='shadow-lg' onClick={() => (window.location.href = '/')}>
            <FormattedMessage id='notfound.button.homepage' defaultMessage='Go to Homepage' />
          </Button>
        </div>
      </Card>
    </div>
  )
}
