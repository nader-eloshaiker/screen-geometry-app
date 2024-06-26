import { ScreenDataEnum } from '@packages/openapi/models/Screen'
import { OverlayInputField } from '@packages/ui/overlay-input-field/OverlayInputField'
import { clsx } from 'clsx'
import { useFormContext } from 'react-hook-form'

type Props = TRestProps & {
  formKey: ScreenDataEnum
  title: string
  inputStyle?: string
  overlay?: string
  overlayStyle?: string
  isLoading?: boolean
}

export const InputField = ({
  formKey,
  title,
  overlay,
  inputStyle,
  overlayStyle,
  isLoading = false,
  ...rest
}: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className='form-control mb-2 flex flex-col'>
      <label htmlFor={formKey} className='label label-text'>
        {title}
      </label>
      {overlay ? (
        <OverlayInputField
          overlays={[{ overlay, overlayClassName: overlayStyle ?? '' }]}
          {...rest}
          className={clsx(inputStyle, {
            'input-error': errors[formKey],
            'skeleton bg-neutral-300 dark:bg-neutral-700 pointer-events-none rounded-lg': isLoading,
          })}
          id={formKey}
          register={register(formKey)}
        />
      ) : (
        <input
          {...rest}
          className={clsx('input input-md input-bordered w-full shadow-md', {
            'input-error': errors[formKey],
            'skeleton bg-neutral-300 dark:bg-neutral-700 pointer-events-none rounded-lg': isLoading,
          })}
          id={formKey}
          {...register(formKey)}
        />
      )}
    </div>
  )
}
