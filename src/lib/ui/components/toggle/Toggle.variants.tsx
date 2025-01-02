import { cva, VariantProps } from 'class-variance-authority'

export type TToggleGroupVariants = VariantProps<typeof ToggleVariants>
export type TTogglePalette = NonNullable<TToggleGroupVariants['palette']>
export type TToggleSize = NonNullable<TToggleGroupVariants['dimension']>
export type TToggleMode = NonNullable<TToggleGroupVariants['mode']>

export const ToggleVariants = cva(
  'inline-flex items-center justify-center gap-2 text-sm font-medium outline-none ring-offset-background transition-colors focus-visible:outline-2  focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      palette: {
        primary:
          'focus-visible:outline-primary-ring data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hocus:bg-primary-hover hocus:text-primary-foreground-hover',
        secondary:
          'focus-visible:outline-secondary-ring data-[state=on]:bg-secondary data-[state=on]:text-secondary-foreground hocus:bg-secondary-hover hocus:text-secondary-foreground-hover',
        mono: 'focus-visible:outline-mono-ring data-[state=on]:bg-mono data-[state=on]:text-mono-foreground hocus:bg-mono-hover hocus:text-mono-foreground-hover',
      },
      mode: {
        ghost: 'rounded-md bg-transparent',
        outline: 'rounded-md border bg-transparent',
        pill: 'rounded-none border-y first:rounded-l-md first:border-l last:rounded-r-md last:border-y last:border-r',
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
        mode: ['outline', 'pill'],
        className: 'border-primary',
      },
      {
        palette: 'secondary',
        mode: ['outline', 'pill'],
        className: 'border-secondary',
      },
      {
        palette: 'mono',
        mode: ['outline', 'pill'],
        className: 'border-mono',
      },
    ],
    defaultVariants: {
      palette: 'primary',
      mode: 'ghost',
      dimension: 'md',
    },
  },
)
