import cn from 'classnames'
import { ReactNode } from 'react'
import { InputPlaceholder } from './InputPlaceholder'

export enum SuffixLocation {
  left = 'left',
  right = 'right',
}

type Props = TReactChildren & { suffix: string | ReactNode; location?: SuffixLocation }

export const InputSuffix = ({ suffix, location = SuffixLocation.right, children }: Props) => {
  return (
    <div className='relative'>
      {children}
      <InputPlaceholder
        className={cn(' absolute top-0 flex h-full w-fit items-center rounded-r', {
          'mr-4 right-0': location === SuffixLocation.right,
          'ml-4 left-0': location === SuffixLocation.left,
        })}
      >
        {suffix}
      </InputPlaceholder>
    </div>
  )
}
