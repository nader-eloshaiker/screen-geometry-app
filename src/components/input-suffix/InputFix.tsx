import cn from 'classnames'
import { ReactNode } from 'react'

import { styled } from 'styled-components'
import { FixLocation } from './InputFix.type'

const InputPlaceholder = styled.span`
  color: var(--fallback-bc, oklch(var(--bc) / var(--tw-placeholder-opacity)));
  --tw-placeholder-opacity: 0.6;
`

type Props = TReactChildren & { fix: string | ReactNode; location: FixLocation }

export const InputFix = ({ fix: suffix, location, children }: Props) => {
  return (
    <div className='relative'>
      {children}
      <InputPlaceholder
        className={cn('absolute top-0 flex h-full w-fit items-center rounded-r pointer-events-none', {
          'mr-4 right-0': location === FixLocation.suffix,
          'ml-4 left-0': location === FixLocation.prefix,
        })}
      >
        {suffix}
      </InputPlaceholder>
    </div>
  )
}
