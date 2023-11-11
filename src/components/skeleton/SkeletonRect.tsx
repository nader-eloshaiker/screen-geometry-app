import { twMerge } from 'tailwind-merge'

type TProps = TRestProps & { className?: string }

export const SkeletonRect = ({ className, ...rest }: TProps) => {
  return (
    <div
      className={twMerge(className, 'animate-pulse rounded-md border-2 dark:bg-neutral-300 bg-neutral-400')}
      {...rest}
    />
  )
}
