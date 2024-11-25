import { cva } from 'class-variance-authority'

export const ButtonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      intent: {
        primary:
          'bg-primary text-primary-foreground shadow-md hover:bg-primary-hover hover:text-primary-foreground-hover focus-visible:bg-primary-focus focus-visible:text-primary-foreground-focus active:bg-primary-active active:text-primary-foreground-active',
        secondary:
          'bg-secondary text-secondary-foreground shadow-md hover:bg-secondary-hover  hover:text-secondary-foreground-hover focus-visible:bg-secondary-focus focus-visible:text-secondary-foreground-focus active:bg-secondary-active active:text-secondary-foreground-active',
        destructive:
          'bg-destructive text-destructive-foreground shadow-md hover:bg-destructive-hover  hover:text-destructive-foreground-hover focus-visible:bg-destructive-focus focus-visible:text-destructive-foreground-focus active:bg-destructive-active active:text-destructive-foreground-active',
        outline:
          'border border-input bg-background shadow-md hover:bg-primary-hover hover:text-primary-foreground-hover focus-visible:bg-primary-focus focus-visible:text-primary-foreground-focus active:bg-primary-active active:text-primary-foreground-active',
        ghost:
          'text-primary hover:text-primary-hover hover:outline hover:outline-input  focus-visible:text-primary-focus focus-visible:outline focus-visible:outline-input active:text-primary-active',
        link: 'text-primary underline-offset-4 hover:text-primary-hover hover:underline focus-visible:text-primary-focus focus-visible:underline active:text-primary-active',
      },
      size: {
        md: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'md',
    },
  },
)
