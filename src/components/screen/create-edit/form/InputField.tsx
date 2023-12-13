import { InputFix } from '@components/input-suffix/InputFix'
import { ScreenDataEnum } from '@models/Screen'
import { clsx } from 'clsx'
import { useFormContext } from 'react-hook-form'

type Props = TRestProps & {
  formKey: ScreenDataEnum
  title: string
  fix?: string
  inputStyle?: string
  fixStyle?: string
  isLoading?: boolean
}

export const InputField = ({ formKey, title, fix, inputStyle, fixStyle, isLoading = false, ...rest }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <label htmlFor={formKey} className='form-control mb-2 flex flex-col'>
      <div className='label'>
        <span className='text-sm'>{title}</span>
      </div>
      {fix ? (
        <InputFix fix={fix} fixStyle={fixStyle ?? ''}>
          <input
            {...rest}
            className={clsx('input input-bordered input-md w-full shadow-md', inputStyle, {
              'input-error': errors[formKey],
              'skeleton bg-neutral-300 dark:bg-neutral-700 pointer-events-none rounded-lg': isLoading,
            })}
            id={formKey}
            {...register(formKey)}
          />
        </InputFix>
      ) : (
        <input
          {...rest}
          className={clsx('input input-bordered input-md w-full shadow-md', {
            'input-error': errors[formKey],
            'skeleton bg-neutral-300 dark:bg-neutral-700 pointer-events-none rounded-lg': isLoading,
          })}
          id={formKey}
          {...register(formKey)}
        />
      )}
    </label>
  )
}
