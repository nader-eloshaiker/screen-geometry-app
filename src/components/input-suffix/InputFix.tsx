import cn from 'classnames'
import { ReactNode } from 'react'
import { InputPlaceholder } from './InputPlaceholder'

export enum FixLocation {
  prefix = 'left',
  suffix = 'right',
}

type Props = TReactChildren & { fix: string | ReactNode; location?: FixLocation }

export const InputFix = ({ fix: suffix, location = FixLocation.suffix, children }: Props) => {
  return (
    <div className='relative'>
      {children}
      <InputPlaceholder
        className={cn('absolute top-0 flex h-full w-fit items-center rounded-r', {
          'mr-4 right-0': location === FixLocation.suffix,
          'ml-4 left-0': location === FixLocation.prefix,
        })}
      >
        {suffix}
      </InputPlaceholder>
    </div>
  )
}
