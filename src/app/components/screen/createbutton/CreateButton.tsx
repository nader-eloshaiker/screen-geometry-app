import { Button } from '@/lib/ui/components/button/Button'
import { Pencil } from 'lucide-react'

type TProps = TRestProps & { className?: string }

export const CreateScreenButton = ({ ...rest }: TProps) => (
  <Button mode='outline' className='shadow-md' {...rest}>
    <Pencil id='theme-dark-icon' className='swap-off size-5 p-0' />
    Create Screen
  </Button>
)
