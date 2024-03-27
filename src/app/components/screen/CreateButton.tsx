import EditIcon from '@app/assets/icons/Edit'
import { FormDrawerActionTypes } from '@app/contexts/FormDrawer/FormDrawerManager'
import { useFormDrawerContext } from '@app/contexts/FormDrawer/useFormDrawerContext'
import { twMerge } from 'tailwind-merge'

type TProps = TRestProps & { className?: string }

export const ScreenButton = ({ className, ...rest }: TProps) => {
  const { formDrawerState, dispatchFormDrawer } = useFormDrawerContext()

  return (
    <button
      className={twMerge('btn btn-primary btn-outline', className)}
      onClick={() => dispatchFormDrawer({ type: FormDrawerActionTypes.Create })}
      disabled={formDrawerState.open}
      {...rest}
    >
      <EditIcon id='theme-dark-icon' className='swap-off size-5 p-0' fill='currentColor' />
      Create Screen
    </button>
  )
}
