import cn from 'classnames'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { ScreenDataEnum } from '../../../../models/Screen'
import { FixLocation, InputFix } from '../../../input-suffix/InputFix'

type Props = TRestProps & {
  formKey: ScreenDataEnum
  title: string
  fix?: string
  fixLocation?: FixLocation
  className?: string
}

export const InputField = ({ formKey, title, fix, fixLocation, className, ...rest }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div id='hSizeControl' className='form-control mb-4 flex flex-col'>
      <label htmlFor={formKey} className='label'>
        <span className='text-sm'>{title}</span>
      </label>
      {fix ? (
        <InputFix fix={fix} location={fixLocation}>
          <input
            {...rest}
            className={twMerge(
              className,
              cn('input input-bordered input-md w-full pr-10 shadow-md', {
                'input-error': errors[formKey],
              }),
            )}
            {...register(formKey)}
          />
        </InputFix>
      ) : (
        <input
          {...rest}
          className={cn('input input-bordered input-md w-full pr-10 shadow-md', {
            'input-error': errors[formKey],
          })}
          {...register(formKey)}
        />
      )}
    </div>
  )
}
