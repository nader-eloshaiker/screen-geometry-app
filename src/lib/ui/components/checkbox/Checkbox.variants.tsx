import { cva, VariantProps } from 'class-variance-authority'

export type TCheckboxVariants = VariantProps<typeof CheckboxVariants>
export type TCheckboxPalette = NonNullable<TCheckboxVariants['palette']>
export type TCheckboxSize = NonNullable<TCheckboxVariants['dimension']>

export const CheckboxVariants = cva(
  'peer shrink-0 rounded-sm border-2 outline-none focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      palette: {
        none: '',
        primary:
          'border-primary text-primary-foreground focus-visible:outline-primary-ring data-[state=checked]:bg-primary hocus:border-primary-hover hocus:bg-primary-hover hocus:text-primary-foreground-hover',
        secondary:
          'border-secondary text-secondary-foreground focus-visible:outline-secondary-ring data-[state=checked]:bg-secondary hocus:border-secondary-hover hocus:bg-secondary-hover hocus:text-secondary-foreground-hover',
        mono: 'border-mono text-mono-foreground focus-visible:outline-mono-ring data-[state=checked]:bg-mono hocus:border-mono-hover hocus:bg-mono-hover hocus:text-mono-foreground-hover',
        danger:
          'border-danger text-danger-foreground focus-visible:outline-danger-ring data-[state=checked]:bg-danger hocus:border-danger-hover hocus:bg-danger-hover hocus:text-danger-foreground-hover',
        warning:
          'border-warning text-warning-foreground focus-visible:outline-warning-ring data-[state=checked]:bg-warning hocus:border-warning-hover hocus:bg-warning-hover hocus:text-warning-foreground-hover',
        success:
          'border-success text-success-foreground focus-visible:outline-success-ring data-[state=checked]:bg-success hocus:border-success-hover hocus:bg-success-hover hocus:text-success-foreground-hover',
      },
      dimension: {
        sm: 'size-5 [&_svg]:size-4',
        md: 'size-6 [&_svg]:size-5',
        lg: 'size-7 [&_svg]:size-6',
      },
    },
    defaultVariants: {
      palette: 'primary',
      dimension: 'md',
    },
  },
)
