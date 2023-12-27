import clsx from 'clsx'
import { ReactNode } from 'react'
import { styled } from 'styled-components'
import { twMerge } from 'tailwind-merge'

export type InputOverlay = { overlay: string | ReactNode; style: string; pointerEvents?: boolean }

type Props = TReactChildren & { overlays: Array<InputOverlay> }

const InputPlaceholder = styled.span`
  color: var(--fallback-bc, oklch(var(--bc) / var(--tw-placeholder-opacity)));
  --tw-placeholder-opacity: 0.6;
`

export const OverlayInputField = ({ overlays, children }: Props) => {
  return (
    <div className='relative'>
      {children}
      {overlays.map(({ overlay, style, pointerEvents }, index) => (
        <InputPlaceholder
          key={index.toString()}
          className={twMerge(
            'absolute top-0 flex h-full w-fit items-center rounded-r',
            style,
            clsx({ 'pointer-events-none': pointerEvents ?? false }),
          )}
        >
          {overlay}
        </InputPlaceholder>
      ))}
    </div>
  )
}
