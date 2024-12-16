import { FormDrawerEventTypes } from '@/app/contexts/FormDrawer/FormDrawerManager'
import { useFormDrawerContext } from '@/app/contexts/FormDrawer/useFormDrawerContext'
import { Button } from '@/lib/ui/components/button/Button'
import { Pencil } from 'lucide-react'

type TProps = TRestProps & { className?: string }

export const CreateScreenButton = ({ className, ...rest }: TProps) => {
  const { formDrawerState, dispatchFormDrawer } = useFormDrawerContext()

  return (
    <Button
      mode='outline'
      className={className}
      onClick={() => dispatchFormDrawer({ type: FormDrawerEventTypes.Create })}
      disabled={formDrawerState.open}
      {...rest}
    >
      <Pencil id='theme-dark-icon' className='swap-off size-5 p-0' />
      Create Screen
    </Button>
  )
}
