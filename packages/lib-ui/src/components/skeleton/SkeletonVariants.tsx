import { cva, type VariantProps } from 'class-variance-authority'

export type TSkeletonVariants = VariantProps<typeof SkeletonVariants>
export type TSkeletonMode = NonNullable<TSkeletonVariants['mode']>
export type TSkeletonDimension = NonNullable<TSkeletonVariants['dimension']>

export const SkeletonVariants = cva('bg-foreground/10 flex animate-pulse items-center justify-center', {
  defaultVariants: {
    dimension: 'rectangle',
    mode: 'empty',
  },
  variants: {
    dimension: {
      circle: 'rounded-full',
      rectangle: 'rounded-md',
    },
    mode: {
      empty: '',
      image: '',
    },
  },
})
