import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type TProps = TRestProps & { className?: string; image: ReactNode }

export const SkeletonImage = ({ className, image, ...rest }: TProps) => {
  return (
    <div
      data-testid='SkeletonImage'
      className={twMerge(
        className,
        'flex items-center justify-center rounded-md skeleton bg-neutral-300 dark:bg-neutral-600 ',
      )}
      {...rest}
    >
      {image}
    </div>
  )
}
