import { cva } from 'class-variance-authority'

export const AlertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-8',
  {
    variants: {
      palette: {
        default: 'bg-background text-foreground [&>svg]:text-foreground',
        danger: 'border-danger-border bg-danger text-danger-foreground [&>svg]:text-danger-foreground',
      },
    },
    defaultVariants: {
      palette: 'default',
    },
  }
)
