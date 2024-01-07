import clsx from 'clsx'
import { InputHTMLAttributes, ReactNode } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { styled } from 'styled-components'
import { twMerge } from 'tailwind-merge'

export type InputOverlay = { overlay: string | ReactNode; overlayClassName: string; pointerEvents?: boolean }

type Props = InputHTMLAttributes<HTMLInputElement> & {
  className?: string
  overlays: Array<InputOverlay>
  register?: UseFormRegisterReturn
}

const InputPlaceholder = styled.span`
  color: var(--fallback-bc, oklch(var(--bc) / var(--tw-placeholder-opacity)));
  --tw-placeholder-opacity: 0.6;
`

export const OverlayInputField = ({ overlays, className, register, ...props }: Props) => {
  const newClassName = twMerge('relative input input-bordered input-md w-full shadow-md', className)

  return (
    <div className='relative'>
      <input className={newClassName} {...props} {...register} />
      {overlays.map(({ overlay, overlayClassName, pointerEvents = false }, index) => (
        <InputPlaceholder
          key={index.toString()}
          className={twMerge(
            'absolute top-0 flex h-full w-fit items-center rounded-r',
            overlayClassName,
            clsx({ 'pointer-events-none': !pointerEvents }),
          )}
        >
          {overlay}
        </InputPlaceholder>
      ))}
    </div>
  )
}
