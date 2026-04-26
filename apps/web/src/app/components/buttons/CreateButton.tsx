import { TranslateMessage } from '@/app/stores/translation'
import { Button } from '@screengeometry/lib-ui/button'
import { cn } from '@screengeometry/lib-ui/utils'
import { Pencil } from 'lucide-react'

export const CreateScreenButton = ({ className, ...rest }: React.ComponentProps<typeof Button>) => (
  <Button mode='outline' className={cn('shadow-md', className)} {...rest}>
    <Pencil id='theme-dark-icon' className='size-5 p-0' />
    <TranslateMessage id='screens.content.createButton' />
  </Button>
)
