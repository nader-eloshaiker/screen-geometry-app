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
          'border-primary text-primary-foreground-active focus-visible:outline-primary-border-hover data-[state=checked]:bg-primary hocus:bg-primary-hover hocus:text-primary-foreground-hover',
        secondary:
          'border-secondary text-secondary-foreground-active focus-visible:outline-secondary-border-hover data-[state=checked]:bg-secondary hocus:bg-secondary-hover hocus:text-secondary-foreground-hover',
        neutral:
          'border-neutral text-neutral-foreground-active focus-visible:outline-neutral-border-hover data-[state=checked]:bg-neutral hocus:bg-neutral-hover hocus:text-neutral-foreground-hover',
        danger:
          'border-danger text-danger-foreground-active focus-visible:outline-danger-border-hover data-[state=checked]:bg-danger hocus:bg-danger-hover hocus:text-danger-foreground-hover',
        warning:
          'border-warning text-warning-foreground-active focus-visible:outline-warning-border-hover data-[state=checked]:bg-warning hocus:bg-warning-hover hocus:text-warning-foreground-hover',
        success:
          'border-success text-success-foreground-active focus-visible:outline-success-border-hover data-[state=checked]:bg-success hocus:bg-success-hover hocus:text-success-foreground-hover',
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
