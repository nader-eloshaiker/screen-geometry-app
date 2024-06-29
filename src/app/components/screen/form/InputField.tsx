import { ScreenDataEnum } from '@packages/openapi/models/Screen'
import { OverlayInputField } from '@packages/ui/overlay-input-field/OverlayInputField'
import { clsx } from 'clsx'
import { useFormContext } from 'react-hook-form'

type Props = TRestProps & {
  formKey: ScreenDataEnum
  title: string
  overlay?: string
  isLoading?: boolean
}

export const InputField = ({ formKey, title, overlay, isLoading = false, ...rest }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  // return (
  //   <div className='flex flex-col'>
  //   <label htmlFor={ScreenDataEnum.diagonalSize} className='label'>
  //     <span className='label-text'>Screen Size</span>
  //   </label>
  //   <label
  //     className={clsx(
  //       'input input-bordered input-secondary flex items-center gap-2 shadow-md transition-all',
  //       {
  //         'input-error': errors[ScreenDataEnum.diagonalSize],
  //         'skeleton bg-neutral-300 dark:bg-neutral-700 pointer-events-none rounded-lg': isLoading,
  //       },
  //     )}
  //   >
  //     <input
  //       autoComplete='off'
  //       placeholder='27'
  //       type='number'
  //       className='w-full'
  //       id={ScreenDataEnum.diagonalSize}
  //       {...register(ScreenDataEnum.diagonalSize)}
  //     />
  //     <span className='text-sm opacity-70'>in</span>
  //   </label>
  // </div>

  // )

  return (
    <OverlayInputField
      formKey={formKey}
      title={title}
      overlays={
        overlay
          ? [
              {
                overlay: (
                  <span key='1' className='fill-current text-sm opacity-70'>
                    {overlay}
                  </span>
                ),
                location: 'right',
              },
            ]
          : []
      }
      className={clsx('input-bordered input-primary shadow-lg transition-all', {
        'input-error': errors[formKey],
        'skeleton bg-neutral-300 dark:bg-neutral-700 pointer-events-none rounded-lg': isLoading,
      })}
      register={register(formKey)}
      {...rest}
    />
  )
}
