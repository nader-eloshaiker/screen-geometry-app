import { twMerge } from 'tailwind-merge'
import CloseIcon from '../../../assets/icons/Close'
import EditIcon from '../../../assets/icons/Edit'
import { FormDrawerActionTypes } from '../../../contexts/FormDrawer/FormDrawerManager'
import { useFormDrawerContext } from '../../../contexts/FormDrawer/useFormDrawaerContext'

type TProps = TRestProps & { className?: string }

export const ScreenButton = ({ className, ...rest }: TProps) => {
  const { formDrawerState, dispatchFormDrawer } = useFormDrawerContext()

  return (
    <button
      className={twMerge(className, 'btn btn-primary btn-outline w-40')}
      onClick={() => dispatchFormDrawer({ type: FormDrawerActionTypes.Toggle })}
      {...rest}
    >
      <div className='flex w-full items-center justify-between'>
        <label className='swap-rotate swap'>
          {/* this hidden checkbox controls the state */}
          <input type='checkbox' className='hidden' checked={formDrawerState.open} readOnly />
          <EditIcon id='theme-dark-icon' className='swap-off h-5 w-5 p-0' fill='currentColor' />
          <CloseIcon id='theme-light-icon' className='swap-on h-5 w-5 p-0' fill='currentColor' />
        </label>
        {formDrawerState.open ? 'Close Editor' : 'New Screen'}
      </div>
    </button>
  )
}
