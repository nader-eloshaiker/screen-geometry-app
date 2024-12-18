import { cva, VariantProps } from 'class-variance-authority'

export type TInputVariantsVariants = VariantProps<typeof InputVariants>
export type TInputVariantsPalette = NonNullable<TInputVariantsVariants['palette']>
export type TInputVariantsDimension = NonNullable<TInputVariantsVariants['dimension']>

const InputVariants = cva(
  'flex h-10 w-full rounded-md border-2 px-3 py-2 text-sm outline-none file:border-0 file:text-sm file:font-medium focus-visible:outline-2 focus-visible:outline-offset-4 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      palette: {
        primary:
          'border-primary-border bg-primary-input text-primary-foreground-input file:text-primary-foreground-input placeholder:text-primary-foreground-muted focus-visible:outline-primary-ring hocus:border-primary-border-hover hocus:text-primary-foreground-input-hover',
        secondary:
          'border-secondary-border bg-secondary-input text-secondary-foreground-input file:text-secondary-foreground-input placeholder:text-secondary-foreground-muted focus-visible:outline-secondary-ring hocus:border-secondary-border-hover hocus:text-secondary-foreground-input-hover',
        mono: 'border-mono-border bg-mono-input text-mono-foreground-input file:text-mono-foreground-input placeholder:text-mono-foreground-muted focus-visible:outline-mono-ring hocus:border-mono-border-hover hocus:text-mono-foreground-input-hover',
        danger:
          'border-danger-border bg-danger-input text-danger-foreground-input file:text-danger-foreground-input placeholder:text-danger-foreground-muted focus-visible:outline-danger-ring hocus:border-danger-border-hover hocus:text-danger-foreground-input-hover',
        success:
          'border-success-border bg-success-input text-success-foreground-input file:text-success-foreground-input placeholder:text-success-foreground-muted focus-visible:outline-success-ring hocus:border-success-border-hover hocus:text-success-foreground-input-hover',
        warning:
          'border-warning-border bg-warning-input text-warning-foreground-input file:text-warning-foreground-input placeholder:text-warning-foreground-muted focus-visible:outline-warning-ring hocus:border-warning-border-hover hocus:text-warning-foreground-input-hover',
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

const InputAdornmentVariants = cva('pointer-events-none absolute flex h-10 items-center justify-center', {
  variants: {
    palette: {
      primary: 'bg-primary-muted text-primary-foreground-muted',
      secondary: 'bg-secondary-muted text-secondary-foreground-muted',
      mono: 'bg-mono-muted text-mono-foreground-muted',
      danger: 'bg-danger-muted text-danger-foreground-muted',
      success: 'bg-success-muted text-success-foreground-muted',
      warning: 'bg-warning-muted text-warning-foreground-muted',
    },
    dimension: {
      sm: 'p-2',
      md: 'p-3',
      lg: 'p-4',
    },
    position: {
      start: 'left-[2px] rounded-l-sm',
      end: 'right-[2px] rounded-r-sm',
    },
  },
  defaultVariants: {
    palette: 'primary',
    dimension: 'md',
  },
})

export { InputAdornmentVariants, InputVariants }
