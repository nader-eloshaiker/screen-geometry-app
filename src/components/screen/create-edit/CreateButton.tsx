import { twMerge } from 'tailwind-merge'
import CloseIcon from '../../../assets/icons/Close'
import EditIcon from '../../../assets/icons/Edit'
import { FormDrawerActionTypes } from '../../../contexts/FormDrawer/FormDrawerManager'
import { useFormDrawerContext } from '../../../contexts/FormDrawer/useFormDrawaerContext'

type TProps = TRestProps & { className?: string }

export const ScreenButton = ({ className, ...rest }: TProps) => {
  const { state, dispatch } = useFormDrawerContext()

  return (
    <button
      className={twMerge(className, 'btn btn-primary btn-outline w-40')}
      onClick={() => dispatch({ type: FormDrawerActionTypes.Toggle })}
      {...rest}
    >
      <div className='flex w-full items-center justify-between'>
        <label className='swap swap-rotate'>
          {/* this hidden checkbox controls the state */}
          <input type='checkbox' className='hidden' checked={state.open} readOnly />
          <EditIcon id='theme-dark-icon' className='swap-off h-5 w-5 p-0' fill='currentColor' />
          <CloseIcon id='theme-light-icon' className='swap-on h-5 w-5 p-0' fill='currentColor' />
        </label>
        {state.open ? 'Close Editor' : 'Open Editor'}
      </div>
    </button>
  )
}
