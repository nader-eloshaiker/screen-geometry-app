import { cva, VariantProps } from 'class-variance-authority'

export type TCheckboxVariants = VariantProps<typeof CheckboxVariants>
export type TCheckboxPalette = NonNullable<TCheckboxVariants['palette']>
export type TCheckboxSize = NonNullable<TCheckboxVariants['dimension']>

export const CheckboxVariants = cva(
  'peer size-4 shrink-0 rounded-sm border-2 shadow-md outline-none focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      palette: {
        primary:
          'border-primary-border text-primary-foreground-active focus-visible:outline-primary-ring data-[state=checked]:bg-primary-active hocus:bg-primary-hover hocus:text-primary-foreground-hover',
        secondary:
          'border-secondary-border text-secondary-foreground-active focus-visible:outline-secondary-ring data-[state=checked]:bg-secondary-active data-[state=checked]:hover:text-secondary-foreground hocus:bg-secondary-hover hocus:text-secondary-foreground-hover',
        mono: 'border-mono-border text-mono-foreground-active focus-visible:outline-mono-ring data-[state=checked]:bg-mono-active hocus:bg-mono-hover hocus:text-mono-foreground-hover',
        danger:
          'border-danger-border text-danger-foreground-active focus-visible:outline-danger-ring data-[state=checked]:bg-danger-active hocus:bg-danger-hover hocus:text-danger-foreground-hover',
        warning:
          'border-warning-border text-warning-foreground-active focus-visible:outline-warning-ring data-[state=checked]:bg-warning-active hocus:bg-warning-hover hocus:text-warning-foreground-hover',
        success:
          'border-success-border text-success-foreground-active focus-visible:outline-success-ring data-[state=checked]:bg-success-active hocus:bg-success-hover hocus:text-success-foreground-hover',
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
