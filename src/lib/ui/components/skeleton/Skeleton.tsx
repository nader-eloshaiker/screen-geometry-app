import { cn } from '@/lib/utils/class-name'
import { VariantProps } from 'class-variance-authority'
import { SkeletonVariants } from './SkeletonVariants'
import { ImageIcon } from './assets/ImageIcon'

export const Skeleton = ({
  mode,
  dimension,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof SkeletonVariants>) => {
  return (
    <div data-testid='Skeleton' className={cn(SkeletonVariants({ dimension, className }))} {...props}>
      {mode === 'image' && <ImageIcon fill='rgb(107 114 128)' className='size-1/3' />}
    </div>
  )
}
