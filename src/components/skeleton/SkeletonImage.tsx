import { twMerge } from 'tailwind-merge'
import ImageIcon from '../../assets/icons/Image'

type TProps = TRestProps & { className?: string }

export const SkeletonImage = ({ className, ...rest }: TProps) => {
  return (
    <div
      className={twMerge(
        className,
        'flex items-center justify-center rounded-md skeleton bg-neutral-300 dark:bg-neutral-600 ',
      )}
      {...rest}
    >
      <ImageIcon className='h-20 w-20' fill='rgb(107 114 128)' />
    </div>
  )
}
