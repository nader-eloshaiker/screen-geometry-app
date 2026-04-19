import { TranslateMessage } from '@/app/stores/translation'
import { Button } from '@screengeometry/lib-ui/button'
import { cn } from '@screengeometry/lib-ui/utils'
import { Share } from 'lucide-react'

export const ShareButton = ({ className, ...rest }: React.ComponentProps<typeof Button>) => (
  <Button mode='outline' className={cn('shadow-md', className)} {...rest}>
    <Share id='share-icon' className='size-5 p-0' />
    <TranslateMessage id='share.content.shareButton' />
  </Button>
)
