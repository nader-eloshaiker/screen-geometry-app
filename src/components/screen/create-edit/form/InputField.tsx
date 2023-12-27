import { OverlayInputField } from '@components/OverlayInputField/OverlayInputField'
import { ScreenDataEnum } from '@models/Screen'
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
      <label htmlFor={formKey} className='label text-sm'>
        {title}
      </label>
      {overlay ? (
        <OverlayInputField overlays={[{ overlay: overlay, style: overlayStyle ?? '' }]}>
          <input
            {...rest}
            className={clsx('input input-bordered input-md w-full shadow-md', inputStyle, {
              'input-error': errors[formKey],
              'skeleton bg-neutral-300 dark:bg-neutral-700 pointer-events-none rounded-lg': isLoading,
            })}
            id={formKey}
            {...register(formKey)}
          />
        </OverlayInputField>
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
    </div>
  )
}
