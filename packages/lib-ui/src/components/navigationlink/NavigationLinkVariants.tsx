import { cva, type VariantProps } from 'class-variance-authority'

export type TNavigationLinkVariants = VariantProps<typeof NavigationLinkVariants>
export type TNavigationLinkPalette = NonNullable<TNavigationLinkVariants['palette']>
export type TNavigationLinkSize = NonNullable<TNavigationLinkVariants['dimension']>

export const NavigationLinkVariants = cva(
  'outline-hidden inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    compoundVariants: [
      {
        className: 'bg-primary text-primary-foreground',
        mode: 'button',
        palette: 'primary',
      },
      {
        className: 'border-primary-border',
        mode: 'outline',
        palette: 'primary',
      },
      {
        className:
          'active:bg-primary-active active:text-primary-foreground-active hocus:bg-primary-hover hocus:text-primary-foreground-hover',
        mode: ['button', 'outline', 'ghost'],
        palette: 'primary',
      },
      {
        className: 'bg-secondary text-secondary-foreground',
        mode: 'button',
        palette: 'secondary',
      },
      {
        className: 'border-secondary-input',
        mode: 'outline',
        palette: 'secondary',
      },
      {
        className:
          'active:bg-secondary-active active:text-secondary-foreground-active hocus:bg-secondary-hover hocus:text-secondary-foreground-hover',
        mode: ['button', 'outline', 'ghost'],
        palette: 'secondary',
      },
      {
        className: 'bg-mono text-mono-foreground',
        mode: 'button',
        palette: 'mono',
      },
      {
        className: 'border-mono-input',
        mode: 'outline',
        palette: 'mono',
      },
      {
        className:
          'active:bg-mono-active active:text-mono-foreground-active hocus:bg-mono-hover hocus:text-mono-foreground-hover',
        mode: ['button', 'outline', 'ghost'],
        palette: 'mono',
      },
    ],
    defaultVariants: {
      dimension: 'md',
      mode: 'button',
      palette: 'primary',
    },
    variants: {
      dimension: {
        icon: 'size-10',
        lg: 'h-11 rounded-md px-8',
        md: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
      },
      mode: {
        button: '',
        ghost: 'text-foreground',
        link: 'active:text-shadow-bold-md hocus:text-shadow-bold-sm text-foreground hocus:underline underline-offset-4',
        outline: 'border',
      },
      palette: {
        mono: 'focus-visible:outline-mono-ring',
        primary: 'focus-visible:outline-primary-ring',
        secondary: 'focus-visible:outline-secondary-ring',
      },
    },
  }
)
