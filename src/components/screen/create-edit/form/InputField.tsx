import cn from 'classnames'
import { useFormContext } from 'react-hook-form'
import { ScreenDataEnum } from '../../../../models/Screen'
import { InputFix } from '../../../input-suffix/InputFix'
import { FixLocation } from '../../../input-suffix/InputFix.type'

type Props = TRestProps & {
  formKey: ScreenDataEnum
  title: string
  fix?: string
  fixWidth?: number
  fixLocation?: FixLocation
  isLoading?: boolean
}

export const InputField = ({
  formKey,
  title,
  fix,
  fixWidth,
  fixLocation = FixLocation.suffix,
  isLoading = false,
  ...rest
}: Props) => {
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
            className={cn('input input-bordered input-md w-full shadow-md', {
              'input-error': errors[formKey],
              [`!pr-${fixWidth}`]: fixLocation === FixLocation.suffix && fixWidth,
              [`!pl-${fixWidth}`]: fixLocation === FixLocation.prefix && fixWidth,
              'skeleton bg-neutral-300 dark:bg-neutral-700 pointer-events-none rounded-lg': isLoading,
            })}
            {...register(formKey)}
          />
        </InputFix>
      ) : (
        <input
          {...rest}
          className={cn('input input-bordered input-md w-full shadow-md', {
            'input-error': errors[formKey],
            'skeleton bg-neutral-300 dark:bg-neutral-700 pointer-events-none rounded-lg': isLoading,
          })}
          {...register(formKey)}
        />
      )}
    </div>
  )
}
