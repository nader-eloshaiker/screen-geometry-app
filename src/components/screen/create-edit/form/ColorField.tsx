import cn from 'classnames'
import { useFormContext } from 'react-hook-form'
import { ScreenDataEnum } from '../../../../models/Screen'
import { DarkMode, LightMode, TThemeMode } from '../../../theme/ThemeConstants'

type Props = { formKey: ScreenDataEnum; title: string; mode: TThemeMode }

export const ColorField = ({ formKey, title, mode }: Props) => {
  const { register, getValues } = useFormContext()
  return (
    <div className='form-control mb-4 flex flex-col'>
      <div
        className={cn('input input-bordered input-md flex items-center justify-center shadow-md w-24', {
          'text-black': mode === LightMode,
          'text-white': mode === DarkMode,
        })}
        style={{ backgroundColor: getValues(formKey) }}
      >
        <span className='text-sm'>{title}</span>
      </div>
      <input hidden {...register(formKey)} />
    </div>
  )
}
