import { type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { SkeletonVariants } from './SkeletonVariants'
import { ImageIcon } from './assets/ImageIcon'

export function Skeleton({
  className,
  dimension,
  mode,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof SkeletonVariants>) {
  return (
    <div data-slot='Skeleton' className={cn(SkeletonVariants({ className, dimension }))} {...props}>
      {mode === 'image' && <ImageIcon fill='rgb(107 114 128)' className='size-1/3' />}
    </div>
  )
}
