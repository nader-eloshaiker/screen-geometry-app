import { cn } from '@/lib/utils'
import { Button } from '@screengeometry/lib-ui/button'
import { Pencil } from 'lucide-react'
import { FormattedMessage } from 'react-intl'

export const CreateScreenButton = ({ className, ...rest }: React.ComponentProps<typeof Button>) => (
  <Button mode='outline' className={cn('shadow-md', className)} {...rest}>
    <Pencil id='theme-dark-icon' className='size-5 p-0' />
    <FormattedMessage id='screens.content.createButton' defaultMessage='Create Screen' />
  </Button>
)
