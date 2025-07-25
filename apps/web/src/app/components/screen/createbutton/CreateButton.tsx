import { cn } from '@/lib/utils'
import { Button, ButtonProps } from '@screengeometry/lib-ui/button'
import { Pencil } from 'lucide-react'
import { forwardRef } from 'react'

export const CreateScreenButton = forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...rest }, forwardedRef) => (
  <Button mode='outline' className={cn('shadow-md', className)} {...rest} ref={forwardedRef}>
    <Pencil id='theme-dark-icon' className='size-5 p-0' />
    Create Screen
  </Button>
))
CreateScreenButton.displayName = 'CreateScreenButton'
