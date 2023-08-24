import { twMerge } from 'tailwind-merge'

type TProps = TRestProps & { className?: string }

export const SkeletonRect = ({ className, ...rest }: TProps) => {
  return <div className={twMerge(className, 'bg-gray-300 border-2 rounded-md animate-pulse')} {...rest} />
}
