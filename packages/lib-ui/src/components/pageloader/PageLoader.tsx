import { ReactNode } from 'react'
import { SpinnerIcon } from '../../assets/SpinnerIcon'

interface Props {
  message?: string | ReactNode
}

export const PageLoader = ({ message }: Props) => {
  return (
    <div
      data-testid='page-loader'
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
