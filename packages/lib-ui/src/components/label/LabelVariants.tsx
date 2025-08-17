import { cva, type VariantProps } from 'class-variance-authority'

export type TLabelVariantsVariants = VariantProps<typeof LabelVariants>
export type TLabelVariantsPalette = NonNullable<TLabelVariantsVariants['palette']>

export const LabelVariants = cva(
  'flex select-none items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50',
  {
    defaultVariants: {
      palette: 'none',
    },
    variants: {
      palette: {
        danger: 'text-danger-label',
        mono: 'text-mono-label',
        none: '',
        primary: 'text-primary-label',
        secondary: 'text-secondary-label',
        success: 'text-success-label',
        warning: 'text-warning-label',
      },
    },
  }
)
