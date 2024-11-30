import { cva, VariantProps } from 'class-variance-authority'

export type TInputVariantsVariants = VariantProps<typeof InputVariants>
export type TInputVariantsPalette = NonNullable<TInputVariantsVariants['palette']>
export type TInputVariantsDimension = NonNullable<TInputVariantsVariants['dimension']>

export const InputVariants = cva(
  'flex h-10 w-full rounded-md border-2 border-primary-input bg-background px-3 py-2 text-sm shadow-md outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      palette: {
        primary:
          'border-primary-border text-primary file:text-primary placeholder:text-primary-muted focus-visible:outline-primary-ring hocus:border-primary-hover hocus:text-primary-hover',
        secondary:
          'border-secondary-border text-secondary file:text-secondary placeholder:text-secondary-muted focus-visible:outline-secondary-ring hocus:border-secondary-hover hocus:text-secondary-hover',
        neutral:
          'border-neutral-border text-neutral file:text-neutral placeholder:text-neutral-muted focus-visible:outline-neutral-ring hocus:border-neutral-hover hocus:text-neutral-hover',
        danger:
          'border-danger-border text-danger file:text-danger placeholder:text-danger-muted focus-visible:outline-danger-ring hocus:border-danger-hover hocus:text-danger-hover',
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
