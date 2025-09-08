import { StateTable } from '@/storybook/StateTable'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { VariantProps } from 'class-variance-authority'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './Select'
import type { SelectTriggerVariants, TSelectTriggerPalette } from './SelectVariants'

const meta = {
  title: 'elements/Select',
  component: Select,
  // tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const SelectStory = ({
  id,
  palette,
  disabled,
}: VariantProps<typeof SelectTriggerVariants> & { disabled?: boolean; id?: string }) => (
  <Select disabled={disabled}>
    <SelectTrigger id={id} className='w-[140px]' palette={palette}>
      <SelectValue placeholder='Selection' />
    </SelectTrigger>
    <SelectContent palette={palette}>
      <SelectItem palette={palette} value='item1'>
        Select Item 1
      </SelectItem>
      <SelectItem palette={palette} value='item2'>
        Select Item 2
      </SelectItem>
      <SelectItem palette={palette} value='item3'>
        Select Item 3
      </SelectItem>
      <SelectItem palette={palette} value='item4'>
        Select Item 4
      </SelectItem>
      <SelectItem palette={palette} value='item5'>
        Select Item 5
      </SelectItem>
    </SelectContent>
  </Select>
)

export const Component: Story = {
  args: {},
  render: () => {
    return <SelectStory />
  },
}

export const Palette: Story = {
  args: {},
  render: () => (
    <StateTable<TSelectTriggerPalette>
      caption='Palettes'
      defaultProps='primary'
      props={['primary', 'secondary', 'mono']}
      states={['normal', 'hover', 'focus', 'active', 'disabled']}
      getComponent={(prop, state) => <SelectStory id={state} palette={prop} disabled={state === 'disabled'} />}
      getRowClassName={(prop) => (prop === 'secondary' ? 'bg-primary text-primary-foreground' : '')}
    />
  ),
  parameters: {
    pseudo: {
      hover: ['#hover'],
      focusVisible: ['#focus'],
    },
  },
}
