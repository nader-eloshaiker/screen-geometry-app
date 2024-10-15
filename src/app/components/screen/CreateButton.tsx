import { FormDrawerEventTypes } from '@/app/contexts/FormDrawer/FormDrawerManager'
import { useFormDrawerContext } from '@/app/contexts/FormDrawer/useFormDrawerContext'
import { Pencil } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

type TProps = TRestProps & { className?: string }

export const CreateScreenButton = ({ className, ...rest }: TProps) => {
  const { formDrawerState, dispatchFormDrawer } = useFormDrawerContext()

  return (
    <button
      className={twMerge('btn btn-primary btn-outline shadow-md', className)}
      onClick={() => dispatchFormDrawer({ type: FormDrawerEventTypes.Create })}
      disabled={formDrawerState.open}
      {...rest}
    >
      <Pencil id='theme-dark-icon' className='swap-off size-5 p-0' />
      Create Screen
    </button>
  )
}
