import { cva } from 'class-variance-authority'

export const AlertVariants = cva(
  'relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
  {
    defaultVariants: {
      palette: 'default',
    },
    variants: {
      palette: {
        default: 'bg-background text-foreground *:data-[slot=alert-description]:text-foreground-muted',
        primary:
          'border-primary-border bg-primary text-primary-foreground *:data-[slot=alert-description]:text-primary-foreground/80',
        secondary:
          'border-secondary-border bg-secondary text-secondary-foreground *:data-[slot=alert-description]:text-secondary-foreground-muted',
        info: 'border-info-border bg-info text-info-foreground *:data-[slot=alert-description]:text-info-foreground/80',
        success:
          'border-success-border bg-success text-success-foreground *:data-[slot=alert-description]:text-success-foreground/80',
        warning:
          'border-warning-border bg-warning text-warning-foreground *:data-[slot=alert-description]:text-warning-foreground/80',
        danger:
          'border-danger-border bg-danger text-danger-foreground *:data-[slot=alert-description]:text-danger-foreground/80',
      },
    },
  }
)
