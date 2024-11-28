import { cva, VariantProps } from 'class-variance-authority'

export type TInputVariantsVariants = VariantProps<typeof InputVariants>
export type TInputVariantsPalette = NonNullable<TInputVariantsVariants['palette']>
export type TInputVariantsDimension = NonNullable<TInputVariantsVariants['dimension']>

export const InputVariants = cva(
  'flex h-10 w-full rounded-md border border-primary-input bg-background px-3 py-2 text-sm shadow-md ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      palette: {
        primary:
          'border-primary-border text-primary file:text-primary placeholder:text-primary-muted focus-visible:ring-primary-ring hocus:border-primary-hover hocus:text-primary-hover',
        secondary:
          'border-secondary-border text-secondary file:text-secondary placeholder:text-secondary-muted focus-visible:ring-secondary-ring hocus:border-secondary-hover hocus:text-secondary-hover',
        neutral:
          'border-neutral-border text-neutral file:text-neutral placeholder:text-neutral-muted focus-visible:ring-neutral-ring hocus:border-neutral-hover hocus:text-neutral-hover',
        danger:
          'border-danger-border text-danger file:text-danger placeholder:text-danger-muted focus-visible:ring-danger-ring hocus:border-danger-hover hocus:text-danger-hover',
      },
      dimension: {
        sm: 'p-4',
        md: 'p-5',
        lg: 'p-6',
      },
    },
    defaultVariants: {
      palette: 'primary',
      dimension: 'md',
    },
  },
)
