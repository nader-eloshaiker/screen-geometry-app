import type { ReactNode } from 'react'
import { SpinnerIcon } from './assets/SpinnerIcon'

export function PageLoader({ message }: { message?: ReactNode }) {
  return (
    <div
      data-slot='page-loader'
      className='flex h-full flex-col justify-between bg-white md:mx-auto md:justify-normal md:rounded-3xl lg:w-[780px] lg:bg-transparent'
    >
      <div className='flex h-screen flex-col items-center justify-center'>
        <div className='flex items-center justify-center py-24' role='status'>
          <SpinnerIcon height={'96px'} width={'96px'} />
        </div>
        {message && <div className='mt-[-70px] text-xl font-bold'>{message}</div>}
      </div>
    </div>
  )
}
