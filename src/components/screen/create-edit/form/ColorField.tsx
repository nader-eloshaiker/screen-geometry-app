import { DarkMode, LightMode, TThemeMode } from '@components/theme/ThemeConstants'
import { ScreenDataEnum } from '@models/Screen'
import cn from 'classnames'
import { useFormContext } from 'react-hook-form'

type Props = { formKey: ScreenDataEnum; title: string; mode: TThemeMode; isLoading?: boolean }

export const ColorField = ({ formKey, title, mode, isLoading = false }: Props) => {
  const { register, getValues } = useFormContext()
  return (
    <div className='form-control mb-4 flex flex-col'>
      <div
        className={cn('input input-bordered input-md flex items-center justify-center shadow-md w-24', {
          'text-black': mode === LightMode,
          'text-white': mode === DarkMode,
          'animate-pulse pointer-events-none': isLoading,
        })}
        style={{ backgroundColor: getValues(formKey) }}
      >
        <span className='text-sm'>{title}</span>
      </div>
      <input hidden {...register(formKey)} />
    </div>
  )
}
