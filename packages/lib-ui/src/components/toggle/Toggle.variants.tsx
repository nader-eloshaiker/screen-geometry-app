import { cva, type VariantProps } from 'class-variance-authority'

export type TToggleGroupVariants = VariantProps<typeof ToggleVariants>
export type TTogglePalette = NonNullable<TToggleGroupVariants['palette']>
export type TToggleSize = NonNullable<TToggleGroupVariants['dimension']>
export type TToggleMode = NonNullable<TToggleGroupVariants['mode']>

export const ToggleVariants = cva(
  'ring-offset-background outline-hidden inline-flex items-center justify-center gap-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    compoundVariants: [
      {
        className: 'border-primary',
        mode: ['outline', 'pill'],
        palette: 'primary',
      },
      {
        className: 'border-secondary',
        mode: ['outline', 'pill'],
        palette: 'secondary',
      },
      {
        className: 'border-mono',
        mode: ['outline', 'pill'],
        palette: 'mono',
      },
    ],
    defaultVariants: {
      dimension: 'md',
      mode: 'ghost',
      palette: 'primary',
    },
    variants: {
      dimension: {
        lg: 'h-11 px-5 py-3 text-base [&_svg]:size-5',
        md: 'h-10 px-4 py-2 text-sm [&_svg]:size-4',
        none: '',
        sm: 'h-9 px-3 py-1 text-sm [&_svg]:size-4',
      },
      mode: {
        ghost: 'rounded-md bg-transparent',
        outline: 'rounded-md border bg-transparent',
        pill: 'rounded-none border-y first:rounded-l-md first:border-l last:rounded-r-md last:border-y last:border-r',
      },
      palette: {
        mono: 'focus-visible:outline-mono-ring data-[state=on]:bg-mono data-[state=on]:text-mono-foreground hocus:bg-mono-hover hocus:text-mono-foreground-hover',
        primary:
          'focus-visible:outline-primary-ring data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hocus:bg-primary-hover hocus:text-primary-foreground-hover',
        secondary:
          'focus-visible:outline-secondary-ring data-[state=on]:bg-secondary data-[state=on]:text-secondary-foreground hocus:bg-secondary-hover hocus:text-secondary-foreground-hover',
      },
    },
  }
)
