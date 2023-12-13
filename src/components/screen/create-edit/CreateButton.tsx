import CloseIcon from '@assets/icons/Close'
import EditIcon from '@assets/icons/Edit'
import { FormDrawerActionTypes } from '@contexts/FormDrawer/FormDrawerManager'
import { useFormDrawerContext } from '@contexts/FormDrawer/useFormDrawaerContext'
import { twMerge } from 'tailwind-merge'

type TProps = TRestProps & { className?: string }

export const ScreenButton = ({ className, ...rest }: TProps) => {
  const { formDrawerState, dispatchFormDrawer } = useFormDrawerContext()

  return (
    <button
      className={twMerge('btn btn-primary btn-outline', className)}
      onClick={() => dispatchFormDrawer({ type: FormDrawerActionTypes.Toggle })}
      {...rest}
    >
      <label className='swap swap-rotate'>
        {/* this hidden checkbox controls the state */}
        <input type='checkbox' className='hidden' id='createScreenButton' checked={formDrawerState.open} readOnly />
        <EditIcon id='theme-dark-icon' className='swap-off h-5 w-5 p-0' fill='currentColor' />
        <CloseIcon id='theme-light-icon' className='swap-on h-5 w-5 p-0' fill='currentColor' />
      </label>
      {formDrawerState.open ? 'Close Editor' : 'New Screen'}
    </button>
  )
}
