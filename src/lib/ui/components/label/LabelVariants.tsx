import { cva, VariantProps } from 'class-variance-authority'

export type TLabelVariantsVariants = VariantProps<typeof LabelVariants>
export type TLabelVariantsPalette = NonNullable<TLabelVariantsVariants['palette']>

export const LabelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50',
  {
    variants: {
      palette: {
        none: '',
        primary: 'text-primary-hover',
        secondary: 'text-card-foreground',
        neutral: 'text-neutral-hover',
        danger: 'text-danger-hover',
      },
    },
    defaultVariants: {
      palette: 'none',
    },
  },
)
