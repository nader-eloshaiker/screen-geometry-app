import { cva, VariantProps } from 'class-variance-authority'

export type TButtonVariants = VariantProps<typeof ButtonVariants>
export type TButtonPalette = NonNullable<TButtonVariants['palette']>
export type TButtonSize = NonNullable<TButtonVariants['dimension']>
export type TButtonMode = NonNullable<TButtonVariants['mode']>

export const ButtonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium outline-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      palette: {
        primary: ' focus-visible:outline-primary-ring',
        secondary: 'focus-visible:outline-secondary-ring',
        mono: 'focus-visible:outline-mono-ring',
        danger: 'focus-visible:outline-danger-ring',
        success: 'focus-visible:outline-success-ring',
        warning: 'focus-visible:outline-warning-ring',
      },
      mode: {
        button: '',
        outline: 'border',
        ghost: 'text-foreground',
        link: 'text-foreground underline-offset-4 data-[active=true]:text-shadow-bold-md hocus:underline hocus:text-shadow-bold-sm',
      },
      dimension: {
        none: '',
        sm: 'h-9 px-3 py-1 text-sm [&_svg]:size-4',
        md: 'h-10 px-4 py-2 text-sm [&_svg]:size-4',
        lg: 'h-11 px-5 py-3 text-base [&_svg]:size-5',
      },
    },
    compoundVariants: [
      {
        palette: 'primary',
        mode: 'button',
        className:
          'bg-primary text-primary-foreground data-[active=true]:bg-primary-active data-[active=true]:text-primary-foreground-active hocus:bg-primary-hover hocus:text-primary-foreground-hover',
      },
      {
        palette: 'primary',
        mode: 'outline',
        className: 'border-primary data-[active=true]:border-primary-active hocus:border-primary',
      },
      {
        palette: 'primary',
        mode: ['outline', 'ghost'],
        className:
          'data-[active=true]:bg-primary-active data-[active=true]:text-primary-foreground-active hocus:bg-primary hocus:text-primary-foreground',
      },
      {
        palette: 'primary',
        mode: ['outline', 'ghost', 'link'],
        className: 'text-primary-primary',
      },
      {
        palette: 'secondary',
        mode: 'button',
        className: 'bg-secondary text-secondary-foreground ',
      },
      {
        palette: 'secondary',
        mode: 'outline',
        className: 'border-secondary-input data-[active=true]:border-secondary-active hocus:border-secondary-hover',
      },
      {
        palette: 'secondary',
        mode: ['button', 'outline', 'ghost'],
        className:
          'data-[active=true]:bg-secondary-active data-[active=true]:text-secondary-foreground-active hocus:bg-secondary-hover hocus:text-secondary-foreground-hover',
      },
      {
        palette: 'secondary',
        mode: ['outline', 'ghost', 'link'],
        className: 'text-secondary-label',
      },
      {
        palette: 'mono',
        mode: 'button',
        className: 'bg-mono text-mono-foreground',
      },
      {
        palette: 'mono',
        mode: 'outline',
        className: 'border-mono-input data-[active=true]:border-mono-active hocus:border-mono-hover',
      },
      {
        palette: 'mono',
        mode: ['button', 'outline', 'ghost'],
        className:
          'data-[active=true]:bg-mono-active data-[active=true]:text-mono-foreground-active hocus:bg-mono-hover hocus:text-mono-foreground-hover',
      },
      {
        palette: 'mono',
        mode: ['outline', 'ghost', 'link'],
        className: 'text-mono-label',
      },
      {
        palette: 'danger',
        mode: 'button',
        className:
          'bg-danger text-danger-foreground data-[active=true]:bg-danger-active data-[active=true]:text-danger-foreground-active hocus:bg-danger-hover hocus:text-danger-foreground-hover',
      },
      {
        palette: 'danger',
        mode: 'outline',
        className: 'border-danger-border data-[active=true]:border-danger-active hocus:border-danger-hover',
      },
      {
        palette: 'danger',
        mode: ['outline', 'ghost'],
        className:
          'data-[active=true]:bg-danger-active data-[active=true]:text-danger-foreground-active hocus:bg-danger hocus:text-danger-foreground',
      },
      {
        palette: 'danger',
        mode: ['outline', 'ghost', 'link'],
        className: 'text-danger-label',
      },
      {
        palette: 'success',
        mode: 'button',
        className: 'bg-success text-success-foreground',
      },
      {
        palette: 'success',
        mode: 'outline',
        className: 'border-success-input data-[active=true]:border-success-active hocus:border-success-hover',
      },
      {
        palette: 'success',
        mode: ['button', 'outline', 'ghost'],
        className:
          'data-[active=true]:bg-success-active data-[active=true]:text-success-foreground-active hocus:bg-success-hover hocus:text-success-foreground-hover',
      },
      {
        palette: 'success',
        mode: ['outline', 'ghost', 'link'],
        className: 'text-success-label',
      },
      {
        palette: 'warning',
        mode: 'button',
        className: 'bg-warning text-warning-foreground',
      },
      {
        palette: 'warning',
        mode: 'outline',
        className: 'border-warning-input data-[active=true]:border-warning-active hocus:border-warning-hover',
      },
      {
        palette: 'warning',
        mode: ['button', 'outline', 'ghost'],
        className:
          'data-[active=true]:bg-warning-active data-[active=true]:text-warning-foreground-active hocus:bg-warning-hover hocus:text-warning-foreground-hover',
      },
      {
        palette: 'warning',
        mode: ['outline', 'ghost', 'link'],
        className: 'text-warning-label',
      },
    ],
    defaultVariants: {
      palette: 'primary',
      mode: 'button',
      dimension: 'md',
    },
  },
)
