import { cva, VariantProps } from 'class-variance-authority'

export type TSkeletonVariants = VariantProps<typeof SkeletonVariants>
export type TSkeletonMode = NonNullable<TSkeletonVariants['mode']>
export type TSkeletonDimension = NonNullable<TSkeletonVariants['dimension']>

export const SkeletonVariants = cva('flex animate-pulse items-center justify-center bg-foreground/10', {
  variants: {
    dimension: {
      rectangle: 'rounded-md',
      circle: 'rounded-full',
    },
    mode: {
      empty: '',
      image: '',
    },
  },
  defaultVariants: {
    mode: 'empty',
    dimension: 'rectangle',
  },
})
