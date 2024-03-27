import { DarkMode, LightMode, TThemeMode } from '@app/components/theme/ThemeConstants'
import { ScreenDataEnum } from '@packages/openapi/models/Screen'
import { clsx } from 'clsx'
import { useFormContext } from 'react-hook-form'

type Props = { formKey: ScreenDataEnum; title: string; mode: TThemeMode; isLoading?: boolean }

export const ColorField = ({ formKey, title, mode, isLoading = false }: Props) => {
  const { register, getValues } = useFormContext()
  return (
    <div className='form-control mb-4 flex flex-col'>
      <label
        className={clsx('input input-md input-bordered flex w-24 items-center justify-center text-sm shadow-md', {
          'text-black': mode === LightMode,
          'text-white': mode === DarkMode,
          'animate-pulse pointer-events-none': isLoading,
        })}
        style={{ backgroundColor: getValues(formKey) }}
        htmlFor={formKey}
      >
        {title}
      </label>
      <input hidden {...register(formKey)} id={formKey} />
    </div>
  )
}
