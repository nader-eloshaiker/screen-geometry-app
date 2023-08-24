import { twMerge } from 'tailwind-merge'
import ImageIcon from '../../assets/icons/Image'

type TProps = TRestProps & { className?: string }

export const SkeletonImage = ({ className, ...rest }: TProps) => {
  return (
    <div
      className={twMerge(className, 'flex items-center justify-center bg-gray-300 border-2 rounded-md animate-pulse')}
      {...rest}
    >
      <ImageIcon className='w-10 h-10' fill='rgb(107 114 128)' />
    </div>
  )
}
