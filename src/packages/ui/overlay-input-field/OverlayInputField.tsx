import { InputHTMLAttributes, ReactNode } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

export type InputOverlay = { overlay: ReactNode; location: 'left' | 'right' }

type Props = InputHTMLAttributes<HTMLInputElement> & {
  formKey: string
  title?: string
  className?: string
  overlays: Array<InputOverlay>
  register?: UseFormRegisterReturn
}

export const OverlayInputField = ({ formKey, title, overlays, className, register, ...rest }: Props) => {
  const finalClassName = twMerge('input flex items-center gap-2', className)

  const content = (
    <label className={finalClassName}>
      {overlays.filter(({ location }) => location === 'left').map(({ overlay }) => overlay)}

      <input id={formKey} className='w-full' {...register} {...rest} />

      {overlays.filter(({ location }) => location === 'right').map(({ overlay }) => overlay)}
    </label>
  )

  return title ? (
    <div className='flex flex-col'>
      <label htmlFor={formKey} className='label'>
        <span className='label-text'>{title}</span>
      </label>
      {content}
    </div>
  ) : (
    content
  )
}
