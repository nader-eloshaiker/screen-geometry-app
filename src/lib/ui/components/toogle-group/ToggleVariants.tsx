import { cva, VariantProps } from 'class-variance-authority'

export type TToggleGroupVariants = VariantProps<typeof ToggleVariants>
export type TTogglePalette = NonNullable<TToggleGroupVariants['palette']>
export type TToggleSize = NonNullable<TToggleGroupVariants['size']>
export type TToggleMode = NonNullable<TToggleGroupVariants['mode']>

export const ToggleVariants = cva(
  'inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      palette: {
        primary:
          'focus-visible:ring-primary-ring data-[state=on]:bg-primary-active data-[state=on]:text-primary-foreground-active hocus:bg-primary-hover hocus:text-primary-foreground-hover',
        secondary:
          'focus-visible:ring-secondary-ring data-[state=on]:bg-secondary-active data-[state=on]:text-secondary-foreground-active hocus:bg-secondary-hover hocus:text-secondary-foreground-hover',
        neutral:
          'focus-visible:ring-neutral-ring data-[state=on]:bg-neutral-active data-[state=on]:text-neutral-foreground-active hocus:bg-neutral-hover hocus:text-neutral-foreground-hover',
      },
      mode: {
        button: 'rounded-md bg-transparent',
        outline: 'rounded-md border bg-transparent',
        pill: 'rounded-none border-y first:rounded-l-md first:border-l last:rounded-r-md last:border-y last:border-r',
      },
      size: {
        sm: 'h-9 min-w-9 px-2.5',
        md: 'h-10 min-w-10 px-3',
        lg: 'h-11 min-w-11 px-5',
      },
    },
    compoundVariants: [
      {
        palette: 'primary',
        mode: ['outline', 'pill'],
        className: 'border-primary-input',
      },
      {
        palette: 'secondary',
        mode: ['outline', 'pill'],
        className: 'border-secondary-input',
      },
      {
        palette: 'neutral',
        mode: ['outline', 'pill'],
        className: 'border-neutral-input',
      },
    ],
    defaultVariants: {
      palette: 'primary',
      mode: 'button',
      size: 'md',
    },
  },
)
