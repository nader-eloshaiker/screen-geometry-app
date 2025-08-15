import { cva, type VariantProps } from 'class-variance-authority'

export type TInputVariantsVariants = VariantProps<typeof InputVariants>
export type TInputVariantsPalette = NonNullable<TInputVariantsVariants['palette']>
export type TInputVariantsDimension = NonNullable<TInputVariantsVariants['dimension']>

const InputVariants = cva(
  'shadow-xs aria-invalid:border-danger aria-invalid:ring-danger/20 dark:aria-invalid:ring-danger/40 peer flex h-9 w-full min-w-0 rounded-md border-2 bg-transparent px-3 py-1 text-base outline-none transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60 md:text-sm',
  {
    variants: {
      dimension: {
        lg: 'px-5 py-6',
        md: 'px-4 py-5',
        sm: 'px-3 py-4',
      },
      palette: {
        primary:
          'border-primary-border bg-primary-input text-primary-foreground-input selection:bg-primary-foreground-input selection:text-primary-input file:text-primary-foreground-input placeholder:text-primary-foreground-input/50 hocus:border-primary-border-hover hocus:text-primary-foreground-input-hover focus-visible:ring-primary-ring',
        secondary:
          'border-secondary-border bg-secondary-input text-secondary-foreground-input selection:bg-secondary-foreground-input selection:text-secondary-input file:text-secondary-foreground-input placeholder:text-secondary-foreground-input-muted focus-visible:ring-secondary-ring hocus:border-secondary-border-hover hocus:text-secondary-foreground-input-hover',
        mono: 'border-mono-border bg-mono-input text-mono-foreground-input selection:bg-mono-foreground-input selection:text-mono-input file:text-mono-foreground-input placeholder:text-mono-foreground-input-muted focus-visible:ring-mono-ring hocus:border-mono-border-hover hocus:text-mono-foreground-input-hover',
        danger:
          'border-danger-border bg-danger-input text-danger-foreground-input selection:bg-danger-foreground-input selection:text-danger-input file:text-danger-foreground-input placeholder:text-danger-foreground-input-muted focus-visible:ring-danger-ring hocus:border-danger-border-hover hocus:text-danger-foreground-input-hover',
        success:
          'border-success-border bg-success-input text-success-foreground-input selection:bg-success-foreground-input selection:text-success-input file:text-success-foreground-input placeholder:text-success-foreground-input-muted focus-visible:ring-success-ring hocus:border-success-border-hover hocus:text-success-foreground-input-hover',
        warning:
          'border-warning-border bg-warning-input text-warning-foreground-input selection:bg-warning-foreground-input selection:text-warning-input file:text-warning-foreground-input placeholder:text-warning-foreground-input-muted focus-visible:ring-warning-ring hocus:border-warning-border-hover hocus:text-warning-foreground-input-hover',
      },
      defaultVariants: {
        dimension: 'md',
        palette: 'primary',
      },
    },
  }
)

const InputAdornmentVariants = cva(
  'pointer-events-none absolute flex h-8 items-center justify-center peer-disabled:pointer-events-none peer-disabled:cursor-not-allowed peer-disabled:opacity-60',
  {
    variants: {
      palette: {
        primary:
          'bg-primary-border text-primary-foreground peer-hover:bg-primary-border-hover peer-hover:text-primary-foreground-hover peer-focus:bg-primary-border-hover peer-focus:text-primary-foreground-hover',
        secondary:
          'bg-secondary-border text-secondary-foreground peer-hover:bg-secondary-hover peer-hover:text-secondary-foreground-hover peer-focus:bg-secondary-border-hover peer-focus:text-secondary-foreground-hover',
        mono: 'bg-mono-border text-mono-foreground peer-hover:bg-mono-border-hover peer-hover:text-mono-foreground-hover peer-focus:bg-mono-border-hover peer-focus:text-mono-foreground-hover',
        success:
          'bg-success-border text-success-foreground peer-hover:bg-success-border-hover peer-hover:text-success-foreground-hover peer-focus:bg-success-border-hover peer-focus:text-success-foreground-hover',
        warning:
          'bg-warning-border text-warning-foreground peer-hover:bg-warning-border-hover peer-hover:text-warning-foreground-hover peer-focus:bg-warning-border-hover peer-focus:text-warning-foreground-hover',
        danger:
          'bg-danger-border text-danger-foreground peer-hover:bg-danger-border-hover peer-hover:text-danger-foreground-hover peer-focus:bg-danger-border-hover peer-focus:text-danger-foreground-hover',
      },
      dimension: {
        lg: 'p-4',
        md: 'p-3',
        sm: 'p-2',
      },
      position: {
        end: 'right-[2px] rounded-r-sm',
        start: 'left-[2px] rounded-l-sm',
      },
    },
    defaultVariants: {
      dimension: 'md',
      palette: 'primary',
    },
  }
)

export { InputAdornmentVariants, InputVariants }
