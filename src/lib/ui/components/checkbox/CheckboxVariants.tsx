import { cva, VariantProps } from 'class-variance-authority'

export type TCheckboxVariants = VariantProps<typeof CheckboxVariants>
export type TCheckboxPalette = NonNullable<TCheckboxVariants['palette']>
export type TCheckboxSize = NonNullable<TCheckboxVariants['dimension']>

export const CheckboxVariants = cva(
  'peer size-4 shrink-0 rounded-sm border shadow-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      palette: {
        primary:
          'border-primary focus-visible:ring-primary-ring data-[state=checked]:bg-primary-active data-[state=checked]:text-primary-foreground-active hocus:bg-primary-hover hocus:text-primary-foreground-hover',
        secondary:
          'border-secondary focus-visible:ring-secondary-ring data-[state=checked]:bg-secondary-active data-[state=checked]:text-secondary-foreground-active hocus:bg-secondary-hover hocus:text-secondary-foreground-hover',
        neutral:
          'border-neutral focus-visible:ring-neutral-ring data-[state=checked]:bg-neutral-active data-[state=checked]:text-neutral-foreground-active hocus:bg-neutral-hover hocus:text-neutral-foreground-hover',
        danger:
          'border-danger focus-visible:ring-danger-ring data-[state=checked]:bg-danger-active data-[state=checked]:text-danger-foreground-active hocus:bg-danger-hover hocus:text-danger-foreground-hover',
        warning:
          'border-warning focus-visible:ring-warning-ring data-[state=checked]:bg-warning-active data-[state=checked]:text-warning-foreground-active hocus:bg-warning-hover hocus:text-warning-foreground-hover',
        success:
          'border-success focus-visible:ring-success-ring data-[state=checked]:bg-success-active data-[state=checked]:text-success-foreground-active hocus:bg-success-hover hocus:text-success-foreground-hover',
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
