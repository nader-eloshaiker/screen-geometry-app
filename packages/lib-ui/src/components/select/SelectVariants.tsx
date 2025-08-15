import { cva, type VariantProps } from 'class-variance-authority'
export type TSelectTriggerVariants = VariantProps<typeof SelectTriggerVariants>
export type TSelectTriggerPalette = NonNullable<TSelectTriggerVariants['palette']>

const SelectTriggerVariants = cva(
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-xs hocus:cursor-pointer flex w-fit items-center justify-between gap-2 whitespace-nowrap rounded-md border px-3 py-2 text-sm outline-none transition-[color,box-shadow] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      palette: {
        primary:
          "border-primary-border bg-primary-input text-primary-foreground-input focus-visible:outline-primary-ring data-[placeholder]:text-primary-foreground-muted hocus:border-primary-border-hover hocus:text-primary-foreground-input-hover [&_svg:not([class*='text-'])]:text-primary-foreground-input",
        secondary:
          "border-secondary-border bg-secondary-input text-secondary-foreground-input focus-visible:outline-secondary-ring data-[placeholder]:text-secondary-foreground-muted hocus:border-secondary-border-hover hocus:text-secondary-foreground-input-hover [&_svg:not([class*='text-'])]:text-secondary-foreground-input",
        mono: "border-mono-border bg-mono-input text-mono-foreground-input focus-visible:outline-mono-ring data-[placeholder]:text-mono-foreground-muted hocus:border-mono-border-hover hocus:text-mono-foreground-input-hover [&_svg:not([class*='text-'])]:text-mono-foreground-input",
      },
      size: {
        sm: 'h-8 text-xs',
        md: 'h-9 text-sm',
        lg: 'h-10 text-base',
      },
    },
    defaultVariants: {
      palette: 'primary',
      size: 'md',
    },
  }
)

const SelectContentVariants = cva(
  'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 max-h-(--radix-select-content-available-height) origin-(--radix-select-content-transform-origin) relative z-50 min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border shadow-md',

  {
    variants: {
      palette: {
        primary: 'border-primary-border bg-mono text-mono-foreground',
        secondary: 'border-secondary-border bg-mono text-mono-foreground',
        mono: 'border-mono-border bg-mono text-mono-foreground',
      },
    },
    defaultVariants: {
      palette: 'primary',
    },
  }
)

const SelectItemVariants = cva(
  "outline-hidden *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 relative flex w-full cursor-default select-none items-center gap-2 rounded-sm py-1.5 pl-2 pr-8 text-sm data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      palette: {
        primary:
          "hocus:bg-primary-hover hocus:text-primary-foreground-hover [&_svg:not([class*='text-'])]:text-primary-foreground-muted",
        secondary:
          "hocus:bg-secondary-hover hocus:text-secondary-foreground-hover [&_svg:not([class*='text-'])]:text-secondary-foreground-muted",
        mono: "hocus:bg-mono-hover hocus:text-mono-foreground-hover [&_svg:not([class*='text-'])]:text-mono-foreground-muted",
      },
    },
    defaultVariants: {
      palette: 'primary',
    },
  }
)

const SelectSeparatorVariants = cva('-mx-1 my-1 h-px', {
  variants: {
    palette: {
      primary: 'bg-primary-muted',
      secondary: 'bg-secondary-muted',
      mono: 'bg-mono-muted',
    },
  },
  defaultVariants: {
    palette: 'primary',
  },
})

export { SelectContentVariants, SelectItemVariants, SelectSeparatorVariants, SelectTriggerVariants }
