import { clsx } from 'clsx'
import { useFormContext } from 'react-hook-form'
import { ScreenDataEnum } from '../../../../models/Screen'
import { DarkMode, LightMode, TThemeMode } from '../../../theme/ThemeConstants'

type Props = { formKey: ScreenDataEnum; title: string; mode: TThemeMode; isLoading?: boolean }

export const ColorField = ({ formKey, title, mode, isLoading = false }: Props) => {
  const { register, getValues } = useFormContext()
  return (
    <div className='form-control mb-4 flex flex-col'>
      <div
        className={clsx('input input-bordered input-md flex w-24 items-center justify-center shadow-md', {
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
