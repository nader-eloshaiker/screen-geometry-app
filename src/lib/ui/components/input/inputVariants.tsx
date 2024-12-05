import { cva, VariantProps } from 'class-variance-authority'

export type TInputVariantsVariants = VariantProps<typeof InputVariants>
export type TInputVariantsPalette = NonNullable<TInputVariantsVariants['palette']>
export type TInputVariantsDimension = NonNullable<TInputVariantsVariants['dimension']>

export const InputVariants = cva(
  'flex h-10 w-full rounded-md border-2 px-3 py-2 text-sm shadow-md outline-none file:border-0 file:text-sm file:font-medium focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      palette: {
        primary:
          'border-primary-border bg-primary-input text-primary-input-foreground file:text-primary-input-foreground placeholder:text-primary-foreground-muted focus-visible:outline-primary-border-hover hocus:border-primary-border-hover hocus:bg-primary-input-hover hocus:text-primary-input-foreground-hover',
        secondary:
          'border-secondary-border bg-secondary-input text-secondary-input-foreground file:text-secondary-input-foreground placeholder:text-secondary-foreground-muted focus-visible:outline-secondary-border-hover hocus:border-secondary-border-hover hocus:bg-secondary-input-hover hocus:text-secondary-input-foreground-hover',
        neutral:
          'border-neutral-border bg-neutral-input text-neutral-input-foreground file:text-neutral-input-foreground placeholder:text-neutral-foreground-muted focus-visible:outline-neutral-border-hover hocus:border-neutral-border-hover hocus:bg-neutral-input-hover hocus:text-neutral-input-foreground-hover',
        danger:
          'border-danger-border bg-danger-input text-danger-input-foreground file:text-danger-input-foreground placeholder:text-danger-foreground-muted focus-visible:outline-danger-border-hover hocus:border-danger-border-hover hocus:bg-danger-input-hover hocus:text-danger-input-foreground-hover',
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
