import { ReactNode } from 'react'
import { styled } from 'styled-components'
import { twMerge } from 'tailwind-merge'

const InputPlaceholder = styled.span`
  color: var(--fallback-bc, oklch(var(--bc) / var(--tw-placeholder-opacity)));
  --tw-placeholder-opacity: 0.6;
`

type Props = TReactChildren & { fix: string | ReactNode; fixStyle: string }

export const InputFix = ({ fix, fixStyle, children }: Props) => {
  return (
    <div className='relative'>
      {children}
      <InputPlaceholder
        className={twMerge('pointer-events-none absolute top-0 flex h-full w-fit items-center rounded-r', fixStyle)}
      >
        {fix}
      </InputPlaceholder>
    </div>
  )
}
