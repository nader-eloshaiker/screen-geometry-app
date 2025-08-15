import { StateTable } from '@/storybook/StateTable'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Label } from './Label'
import type { TLabelVariantsPalette } from './LabelVariants'

const meta = {
  // tags: ['autodocs'],
  args: { onBlur: fn(), onClick: fn(), onFocus: fn() },
  component: Label,
  parameters: {
    layout: 'centered',
  },
  title: 'elements/Label',
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

const palettes: Array<TLabelVariantsPalette> = ['none', 'primary', 'secondary', 'mono', 'danger', 'success', 'warning']

export const Palette: Story = {
  args: {},
  parameters: {
    pseudo: {
      focusVisible: ['#focus'],
      hover: ['#hover'],
    },
  },
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
      getRowClassName={(prop) => (prop === 'secondary' ? 'bg-primary text-primary-foreground' : '')}
    />
  ),
}
