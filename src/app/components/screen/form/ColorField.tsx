import { DarkMode, LightMode, TThemeMode } from '@app/components/theme/ThemeConstants'
import { ScreenDataEnum } from '@packages/openapi/models/Screen'
import { clsx } from 'clsx'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

type Props = { formKey: ScreenDataEnum; title: string; mode: TThemeMode; isLoading?: boolean; className?: string }

export const ColorField = ({ formKey, title, mode, isLoading = false, className }: Props) => {
  const { register, getValues } = useFormContext()
  const color = getValues(formKey)
  return (
    <div className={twMerge('form-control flex flex-col', className)}>
      <label className='label label-text' htmlFor={formKey}>
        {title} Color
      </label>
      <div
        className={clsx(
          'input input-md input-bordered input-secondary flex items-center justify-center text-sm shadow-md',
          {
            'text-black': mode === LightMode,
            'text-white': mode === DarkMode,
            'animate-pulse pointer-events-none': isLoading,
          },
        )}
        style={{ backgroundColor: color }}
      >
        {color}
      </div>
      <input hidden {...register(formKey)} id={formKey} />
    </div>
  )
}
