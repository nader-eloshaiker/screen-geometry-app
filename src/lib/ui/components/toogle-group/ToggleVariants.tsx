import { cva, VariantProps } from 'class-variance-authority'

export type TToggleGroupVariants = VariantProps<typeof ToggleVariants>
export type TTogglePalette = NonNullable<TToggleGroupVariants['palette']>
export type TToggleSize = NonNullable<TToggleGroupVariants['dimension']>
export type TToggleMode = NonNullable<TToggleGroupVariants['mode']>

export const ToggleVariants = cva(
  'inline-flex items-center justify-center text-sm font-medium outline-none ring-offset-background transition-colors focus-visible:outline-2  focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      palette: {
        primary:
          'focus-visible:outline-primary-border-hover data-[state=on]:bg-primary-active data-[state=on]:text-primary-foreground-active hocus:bg-primary-hover hocus:text-primary-foreground-hover',
        secondary:
          'focus-visible:outline-secondary-border-hover data-[state=on]:bg-secondary-active data-[state=on]:text-secondary-foreground-active hocus:bg-secondary-hover hocus:text-secondary-foreground-hover',
        neutral:
          'focus-visible:outline-neutral-border-hover data-[state=on]:bg-neutral-active data-[state=on]:text-neutral-foreground-active hocus:bg-neutral-hover hocus:text-neutral-foreground-hover',
      },
      mode: {
        ghost: 'rounded-md bg-transparent',
        outline: 'rounded-md border bg-transparent',
        pill: 'rounded-none border-y first:rounded-l-md first:border-l last:rounded-r-md last:border-y last:border-r',
      },
      dimension: {
        sm: 'h-9 min-w-9 px-2.5',
        md: 'h-10 min-w-10 px-3',
        lg: 'h-11 min-w-11 px-5',
      },
    },
    compoundVariants: [
      {
        palette: 'primary',
        mode: ['outline', 'pill'],
        className: 'border-primary-border',
      },
      {
        palette: 'secondary',
        mode: ['outline', 'pill'],
        className: 'border-secondary-border',
      },
      {
        palette: 'neutral',
        mode: ['outline', 'pill'],
        className: 'border-neutral-border',
      },
    ],
    defaultVariants: {
      palette: 'primary',
      mode: 'ghost',
      dimension: 'md',
    },
  },
)
