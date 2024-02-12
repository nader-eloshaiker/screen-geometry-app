import ImageIcon from '@assets/icons/Image'
import { twMerge } from 'tailwind-merge'

type TProps = TRestProps & { className?: string }

export const SkeletonImage = ({ className, ...rest }: TProps) => {
  return (
    <div
      data-testid='SkeletonImage'
      className={twMerge(
        className,
        'flex items-center justify-center rounded-md skeleton bg-neutral-300 dark:bg-neutral-600 ',
      )}
      {...rest}
    >
      <ImageIcon className='size-20' fill='rgb(107 114 128)' />
    </div>
  )
}
