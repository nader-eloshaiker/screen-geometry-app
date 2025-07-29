import { cva, VariantProps } from 'class-variance-authority'
export type TSelectTriggerVariants = VariantProps<typeof SelectTriggerVariants>
export type TSelectTriggerPalette = NonNullable<TSelectTriggerVariants['palette']>

const SelectTriggerVariants = cva(
  'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border-2 px-3 py-2 text-sm shadow-sm outline-none  focus:outline-offset-4 focus-visible:outline-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',

  {
    variants: {
      palette: {
        primary:
          'border-primary-border bg-primary-input text-primary-foreground-input focus-visible:outline-primary-ring data-[placeholder]:text-primary-foreground-muted hocus:border-primary-border-hover hocus:text-primary-foreground-input-hover',
        secondary:
          'border-secondary-border bg-secondary-input text-secondary-foreground-input focus-visible:outline-secondary-ring data-[placeholder]:text-secondary-foreground-muted hocus:border-secondary-border-hover hocus:text-secondary-foreground-input-hover',
        mono: 'border-mono-border bg-mono-input text-mono-foreground-input focus-visible:outline-mono-ring data-[placeholder]:text-mono-foreground-muted hocus:border-mono-border-hover hocus:text-mono-foreground-input-hover',
      },
    },
    defaultVariants: {
      palette: 'primary',
    },
  }
)

const SelectContentVariants = cva(
  'relative z-50 max-h-[--radix-select-content-available-height] min-w-32 origin-[--radix-select-content-transform-origin] overflow-y-auto overflow-x-hidden rounded-md border shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
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
  'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  {
    variants: {
      palette: {
        primary: 'hocus:bg-primary-hover hocus:text-primary-foreground-hover',
        secondary: 'hocus:bg-secondary-hover hocus:text-secondary-foreground-hover',
        mono: 'hocus:bg-mono-hover hocus:text-mono-foreground-hover',
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
