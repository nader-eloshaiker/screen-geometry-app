import EditIcon from '@assets/icons/Edit'
import { FormDrawerActionTypes } from '@contexts/FormDrawer/FormDrawerManager'
import { useFormDrawerContext } from '@contexts/FormDrawer/useFormDrawerContext'
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
      <EditIcon id='theme-dark-icon' className='swap-off h-5 w-5 p-0' fill='currentColor' />
      Create Screen
    </button>
  )
}
