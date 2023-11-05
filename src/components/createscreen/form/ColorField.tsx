import { useFormContext } from 'react-hook-form'
import { ScreenDataEnum } from '../../../models/Screen'

type Props = { formKey: ScreenDataEnum; title: string; color: string }

export const ColorField = ({ formKey, title, color }: Props) => {
  const { register } = useFormContext()
  return (
    <div className='form-control mb-4 flex flex-col'>
      <div
        className=' input input-bordered input-md flex w-full items-center justify-center text-black shadow-md'
        style={{ backgroundColor: color }}
      >
        <span className='text-sm'>{title}</span>
      </div>
      <input hidden {...register(formKey)} />
    </div>
  )
}
