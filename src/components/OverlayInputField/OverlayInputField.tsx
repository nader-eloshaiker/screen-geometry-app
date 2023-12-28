import clsx from 'clsx'
import { ReactNode } from 'react'
import { styled } from 'styled-components'
import { twMerge } from 'tailwind-merge'

export type InputOverlay = { overlay: string | ReactNode; overlayClassName: string; pointerEvents?: boolean }

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  overlays: Array<InputOverlay>
}

const InputPlaceholder = styled.span`
  color: var(--fallback-bc, oklch(var(--bc) / var(--tw-placeholder-opacity)));
  --tw-placeholder-opacity: 0.6;
`

export const OverlayInputField = ({ overlays, ...props }: Props) => {
  const propsWithOverrides = {
    ...props,
    className: twMerge('relative input input-bordered input-md w-full shadow-md', props.className),
  }

  return (
    <div className='relative'>
      <input {...propsWithOverrides} />
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
