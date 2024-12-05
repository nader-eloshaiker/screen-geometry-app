import { cva, VariantProps } from 'class-variance-authority'

export type TButtonVariants = VariantProps<typeof ButtonVariants>
export type TButtonPalette = NonNullable<TButtonVariants['palette']>
export type TButtonSize = NonNullable<TButtonVariants['dimension']>
export type TButtonMode = NonNullable<TButtonVariants['mode']>

export const ButtonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none  [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      palette: {
        primary: ' focus-visible:outline-primary-border-hover',
        secondary: 'focus-visible:outline-secondary-border-hover',
        neutral: 'focus-visible:outline-neutral-border-hover',
        danger: 'focus-visible:outline-danger-border-hover',
        success: 'focus-visible:outline-success-border-hover',
        warning: 'focus-visible:outline-warning-border-hover',
      },
      mode: {
        button: 'shadow-md',
        outline: 'border shadow-md',
        ghost: 'text-foreground',
        link: 'text-foreground underline-offset-4 active:text-shadow-bold-md hocus:underline hocus:text-shadow-bold-sm',
      },
      dimension: {
        sm: 'h-9 rounded-md px-3',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 rounded-md px-8',
        icon: 'size-10',
      },
    },
    compoundVariants: [
      {
        palette: 'primary',
        mode: 'button',
        className: 'bg-primary text-primary-foreground',
      },
      {
        palette: 'primary',
        mode: 'outline',
        className: 'border-primary-border',
      },
      {
        palette: 'primary',
        mode: ['button', 'outline', 'ghost'],
        className:
          'active:bg-primary-active active:text-primary-foreground-active hocus:bg-primary-hover hocus:text-primary-foreground-hover',
      },
      {
        palette: 'secondary',
        mode: 'button',
        className: 'bg-secondary text-secondary-foreground ',
      },
      {
        palette: 'secondary',
        mode: 'outline',
        className: 'border-secondary-input',
      },
      {
        palette: 'secondary',
        mode: ['button', 'outline', 'ghost'],
        className:
          'active:bg-secondary-active active:text-secondary-foreground-active hocus:bg-secondary-hover hocus:text-secondary-foreground-hover',
      },
      {
        palette: 'neutral',
        mode: 'button',
        className: 'bg-neutral text-neutral-foreground',
      },
      {
        palette: 'neutral',
        mode: 'outline',
        className: 'border-neutral-input',
      },
      {
        palette: 'neutral',
        mode: ['button', 'outline', 'ghost'],
        className:
          'active:bg-neutral-active active:text-neutral-foreground-active hocus:bg-neutral-hover hocus:text-neutral-foreground-hover',
      },
      {
        palette: 'danger',
        mode: 'button',
        className: 'bg-danger text-danger-foreground',
      },
      {
        palette: 'danger',
        mode: 'outline',
        className: 'border-danger-input',
      },
      {
        palette: 'danger',
        mode: ['button', 'outline', 'ghost'],
        className:
          'active:bg-danger-active active:text-danger-foreground-active hocus:bg-danger-hover hocus:text-danger-foreground-hover',
      },
      {
        palette: 'success',
        mode: 'button',
        className: 'bg-success text-success-foreground',
      },
      {
        palette: 'success',
        mode: 'outline',
        className: 'border-success-input',
      },
      {
        palette: 'success',
        mode: ['button', 'outline', 'ghost'],
        className:
          'active:bg-success-active active:text-success-foreground-active hocus:bg-success-hover hocus:text-success-foreground-hover',
      },
      {
        palette: 'warning',
        mode: 'button',
        className: 'bg-warning text-warning-foreground',
      },
      {
        palette: 'warning',
        mode: 'outline',
        className: 'border-warning-input',
      },
      {
        palette: 'warning',
        mode: ['button', 'outline', 'ghost'],
        className:
          'active:bg-warning-active active:text-warning-foreground-active hocus:bg-warning-hover hocus:text-warning-foreground-hover',
      },
    ],
    defaultVariants: {
      palette: 'primary',
      mode: 'button',
      dimension: 'md',
    },
  },
)
