import cn from 'classnames'
import { useFormContext } from 'react-hook-form'
import { ScreenDataEnum } from '../../../../models/Screen'
import { DarkMode, LightMode, TThemeMode } from '../../../theme/ThemeConstants'

type Props = { formKey: ScreenDataEnum; title: string; color: string; mode: TThemeMode }

export const ColorField = ({ formKey, title, color, mode }: Props) => {
  const { register } = useFormContext()
  return (
    <div className='form-control mb-4 flex flex-col'>
      <div
        className={cn('input input-bordered input-md flex w-full items-center justify-center shadow-md', {
          'text-black': mode === LightMode,
          'text-white': mode === DarkMode,
        })}
        style={{ backgroundColor: color }}
      >
        <span className='text-sm'>{title}</span>
      </div>
      <input hidden {...register(formKey)} />
    </div>
  )
}
