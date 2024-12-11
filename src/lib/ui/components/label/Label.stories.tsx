import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { StateTable } from '../../storybook/StateTable'
import { Label } from './Label'
import { TLabelVariantsPalette } from './LabelVariants'

const meta = {
  title: 'elements/Label',
  component: Label,
  // tags: ['autodocs'],
  args: { onClick: fn(), onFocus: fn(), onBlur: fn() },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

const palettes: Array<TLabelVariantsPalette> = ['none', 'primary', 'secondary', 'mono', 'danger']

export const Palette: Story = {
  args: {},
  render: () => (
    <StateTable<TLabelVariantsPalette>
      caption='Palettes'
      defaultProps='primary'
      props={palettes}
      states={['normal', 'hover', 'disabled']}
      getComponent={(prop, state) => (
        <Label id={state} palette={prop}>
          Email
        </Label>
      )}
      getRowClassName={(prop) => (prop === 'secondary' ? 'bg-card text-card-foreground' : '')}
    />
  ),
  parameters: {
    pseudo: {
      hover: ['#hover'],
      focusVisible: ['#focus'],
    },
  },
}
