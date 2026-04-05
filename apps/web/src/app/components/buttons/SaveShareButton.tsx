import { Button } from '@screengeometry/lib-ui/button'
import { cn } from '@screengeometry/lib-ui/utils'
import { Share } from 'lucide-react'
import { FormattedMessage } from 'react-intl'

export const SaveShareButton = ({ className, ...rest }: React.ComponentProps<typeof Button>) => (
  <Button mode='outline' className={cn('shadow-md', className)} {...rest}>
    <Share id='share-icon' className='size-5 p-0' />
    <FormattedMessage id='share.content.saveButton' defaultMessage='Add to My Screens' />
  </Button>
)
