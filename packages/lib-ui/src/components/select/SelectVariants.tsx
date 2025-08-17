import { cva, type VariantProps } from 'class-variance-authority'
export type TSelectTriggerVariants = VariantProps<typeof SelectTriggerVariants>
export type TSelectTriggerPalette = NonNullable<TSelectTriggerVariants['palette']>

const SelectTriggerVariants = cva(
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-xs hocus:cursor-pointer flex w-fit items-center justify-between gap-2 whitespace-nowrap rounded-md border px-3 py-2 text-sm outline-none transition-[color,box-shadow] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      palette: {
        primary:
          'border-primary-border bg-primary-input text-primary-foreground-input selection:bg-primary-foreground-input selection:text-primary-input placeholder:text-primary-foreground-input/50 hocus:border-primary-border-hover hocus:text-primary-foreground-input-hover focus-visible:ring-primary-ring',
        secondary:
          'border-secondary-border bg-secondary-input text-secondary-foreground-input selection:bg-secondary-foreground-input selection:text-secondary-input placeholder:text-secondary-foreground-input-muted focus-visible:ring-secondary-ring hocus:border-secondary-border-hover hocus:text-secondary-foreground-input-hover',
        mono: 'border-mono-border bg-mono-input text-mono-foreground-input selection:bg-mono-foreground-input selection:text-mono-input file:text-mono-foreground-input placeholder:text-mono-foreground-input-muted focus-visible:ring-mono-ring hocus:border-mono-border-hover hocus:text-mono-foreground-input-hover',
        danger:
          'border-danger-border bg-danger-input text-danger-foreground-input selection:bg-danger-foreground-input selection:text-danger-input placeholder:text-danger-foreground-input-muted focus-visible:ring-danger-ring hocus:border-danger-border-hover hocus:text-danger-foreground-input-hover',
        success:
          'border-success-border bg-success-input text-success-foreground-input selection:bg-success-foreground-input selection:text-success-input placeholder:text-success-foreground-input-muted focus-visible:ring-success-ring hocus:border-success-border-hover hocus:text-success-foreground-input-hover',
        warning:
          'border-warning-border bg-warning-input text-warning-foreground-input selection:bg-warning-foreground-input selection:text-warning-input placeholder:text-warning-foreground-input-muted focus-visible:ring-warning-ring hocus:border-warning-border-hover hocus:text-warning-foreground-input-hover',
      },
      dimension: {
        lg: 'px-5 py-6',
        md: 'px-4 py-5',
        sm: 'px-3 py-4',
      },
      defaultVariants: {
        dimension: 'md',
        palette: 'primary',
      },
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
