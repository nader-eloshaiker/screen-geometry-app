import { twMerge } from 'tailwind-merge'

type TProps = TRestProps & { className?: string }

export const SkeletonRect = ({ className, ...rest }: TProps) => {
  return <div className={twMerge('skeleton bg-neutral-300 dark:bg-neutral-600 rounded-md', className)} {...rest} />
}
