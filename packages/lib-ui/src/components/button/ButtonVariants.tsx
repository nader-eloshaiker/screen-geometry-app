import { cva, type VariantProps } from 'class-variance-authority'

export type TButtonVariants = VariantProps<typeof ButtonVariants>
export type TButtonPalette = NonNullable<TButtonVariants['palette']>
export type TButtonSize = NonNullable<TButtonVariants['dimension']>
export type TButtonMode = NonNullable<TButtonVariants['mode']>

export const ButtonVariants = cva(
  "aria-invalid:outline-danger inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all hover:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      palette: {
        danger: 'focus-visible:outline-danger-ring',
        mono: 'focus-visible:outline-mono-ring',
        primary: 'focus-visible:outline-primary-ring',
        secondary: 'focus-visible:outline-secondary-ring',
        navigation: 'focus-visible:outline-navigation-ring',
        success: 'focus-visible:outline-success-ring',
        warning: 'focus-visible:outline-warning-ring',
      },
      mode: {
        button: 'shadow-xs',
        ghost: 'text-foreground hocus:shadow-xs',
        link: 'data-[active=true]:text-shadow-bold-md hocus:text-shadow-bold-sm text-foreground hocus:underline underline-offset-4',
        outline: 'shadow-xs border',
      },
      dimension: {
        'icon-lg': 'size-11 [&_svg]:size-6',
        'icon-md': 'size-10 [&_svg]:size-5',
        'icon-sm': 'size-9 [&_svg]:size-5',
        lg: 'h-11 px-8 py-3 text-base [&_svg]:size-5',
        md: 'h-10 px-6 py-2 text-sm [&_svg]:size-4',
        none: '',
        sm: 'h-9 px-4 py-1 text-sm [&_svg]:size-4',
      },
    },
    compoundVariants: [
      {
        className: 'bg-primary text-primary-foreground [&_svg]:text-primary-foreground',
        mode: 'button',
        palette: 'primary',
      },
      {
        className: 'border-primary data-[active=true]:border-primary-active hocus:border-primary',
        mode: 'outline',
        palette: 'primary',
      },
      {
        className:
          'data-[active=true]:bg-primary-active data-[active=true]:text-primary-foreground-active hocus:bg-primary-hover hocus:text-primary-foreground-hover hocus:[&_svg]:text-primary-foreground-hover data-[active=true]:[&_svg]:text-primary-foreground-active',
        mode: ['button', 'outline', 'ghost'],
        palette: 'primary',
      },
      {
        className: 'text-primary-border [&_svg]:text-primary-border',
        mode: ['outline', 'ghost', 'link'],
        palette: 'primary',
      },
      {
        className: 'bg-secondary text-secondary-foreground [&_svg]:text-secondary-foreground',
        mode: 'button',
        palette: 'secondary',
      },
      {
        className: 'border-secondary-input data-[active=true]:border-secondary-active hocus:border-secondary-hover',
        mode: 'outline',
        palette: 'secondary',
      },
      {
        className:
          'data-[active=true]:bg-secondary-active data-[active=true]:text-secondary-foreground-active hocus:bg-secondary-hover hocus:text-secondary-foreground-hover hocus:[&_svg]:text-secondary-foreground-hover data-[active=true]:[&_svg]:text-secondary-foreground-active',
        mode: ['button', 'outline', 'ghost'],
        palette: 'secondary',
      },
      {
        className: 'text-secondary-label [&_svg]:text-secondary-label',
        mode: ['outline', 'ghost', 'link'],
        palette: 'secondary',
      },
      {
        className: 'bg-navigation text-navigation-foreground [&_svg]:text-navigation-foreground',
        mode: 'button',
        palette: 'navigation',
      },
      {
        className: 'border-navigation-input data-[active=true]:border-navigation-active hocus:border-navigation-hover',
        mode: 'outline',
        palette: 'navigation',
      },
      {
        className:
          'data-[active=true]:bg-navigation-active data-[active=true]:text-navigation-foreground-active hocus:bg-navigation-hover hocus:text-navigation-foreground-hover hocus:[&_svg]:text-navigation-foreground-hover data-[active=true]:[&_svg]:text-navigation-foreground-active',
        mode: ['button', 'outline', 'ghost'],
        palette: 'navigation',
      },
      {
        className: 'text-navigation-label [&_svg]:text-navigation-label',
        mode: ['outline', 'ghost', 'link'],
        palette: 'navigation',
      },
      {
        className: 'bg-mono text-mono-foreground [&_svg]:text-primary-mono-foreground',
        mode: 'button',
        palette: 'mono',
      },
      {
        className: 'border-mono-input data-[active=true]:border-mono-active hocus:border-mono-hover',
        mode: 'outline',
        palette: 'mono',
      },
      {
        className:
          'data-[active=true]:bg-mono-active data-[active=true]:text-mono-foreground-active hocus:bg-mono-hover hocus:text-mono-foreground-hover hocus:[&_svg]:text-mono-foreground-hover data-[active=true]:[&_svg]:text-mono-foreground-active data-[active=true]:[&_svg]:text-mono-foreground-active',
        mode: ['button', 'outline', 'ghost'],
        palette: 'mono',
      },
      {
        className: 'text-mono-label [&_svg]:text-mono-label',
        mode: ['outline', 'ghost', 'link'],
        palette: 'mono',
      },
      {
        className: 'bg-danger text-danger-foreground [&_svg]:text-danger-foreground',
        mode: 'button',
        palette: 'danger',
      },
      {
        className: 'border-danger-border data-[active=true]:border-danger-active hocus:border-danger-hover',
        mode: 'outline',
        palette: 'danger',
      },
      {
        className:
          'data-[active=true]:bg-danger-active data-[active=true]:text-danger-foreground-active hocus:bg-danger-hover hocus:text-danger-foreground-hover hocus:[&_svg]:text-danger-foreground-hover data-[active=true]:[&_svg]:text-danger-foreground-active data-[active=true]:[&_svg]:text-danger-foreground-active',
        mode: ['button', 'outline', 'ghost'],
        palette: 'danger',
      },
      {
        className: 'text-danger-label [&_svg]:text-danger-label',
        mode: ['outline', 'ghost', 'link'],
        palette: 'danger',
      },
      {
        className: 'bg-success text-success-foreground [&_svg]:text-success-foreground',
        mode: 'button',
        palette: 'success',
      },
      {
        className: 'border-success-input data-[active=true]:border-success-active hocus:border-success-hover',
        mode: 'outline',
        palette: 'success',
      },
      {
        className:
          'data-[active=true]:bg-success-active data-[active=true]:text-success-foreground-active hocus:bg-success-hover hocus:text-success-foreground-hover hocus:[&_svg]:text-success-foreground-hover data-[active=true]:[&_svg]:text-success-foreground-active data-[active=true]:[&_svg]:text-success-foreground-active',
        mode: ['button', 'outline', 'ghost'],
        palette: 'success',
      },
      {
        className: 'text-success-label [&_svg]:text-success-label',
        mode: ['outline', 'ghost', 'link'],
        palette: 'success',
      },
      {
        className: 'bg-warning text-warning-foreground [&_svg]:text-warning-foreground',
        mode: 'button',
        palette: 'warning',
      },
      {
        className: 'border-warning-input data-[active=true]:border-warning-active hocus:border-warning-hover',
        mode: 'outline',
        palette: 'warning',
      },
      {
        className:
          'data-[active=true]:bg-warning-active data-[active=true]:text-warning-foreground-active hocus:bg-warning-hover hocus:text-warning-foreground-hover hocus:[&_svg]:text-warning-foreground-hover data-[active=true]:[&_svg]:text-warning-foreground-active data-[active=true]:[&_svg]:text-warning-foreground-active',
        mode: ['button', 'outline', 'ghost'],
        palette: 'warning',
      },
      {
        className: 'text-warning-label [&_svg]:text-warning-label',
        mode: ['outline', 'ghost', 'link'],
        palette: 'warning',
      },
    ],
    defaultVariants: {
      dimension: 'md',
      mode: 'button',
      palette: 'primary',
    },
  }
)
