import { twMerge } from 'tailwind-merge'
import ImageIcon from '../../assets/icons/Image'

type TProps = TRestProps & { className?: string }

export const SkeletonImage = ({ className, ...rest }: TProps) => {
  return (
    <div
      className={twMerge(className, 'flex animate-pulse items-center justify-center rounded-md border-2 bg-gray-300')}
      {...rest}
    >
      <ImageIcon className='h-10 w-10' fill='rgb(107 114 128)' />
    </div>
  )
}
