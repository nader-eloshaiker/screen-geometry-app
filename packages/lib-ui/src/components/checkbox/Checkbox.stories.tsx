import { StateTable } from '@/storybook/StateTable'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Checkbox } from './Checkbox'
import type { TCheckboxPalette, TCheckboxSize } from './CheckboxVariants'

const meta = {
  args: { onBlur: fn(), onClick: fn(), onFocus: fn() },
  // tags: ['autodocs'],
  argTypes: {},
  component: Checkbox,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  title: 'Elements/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Palette: Story = {
  args: {},
  parameters: {
    pseudo: {
      active: ['#active'],
      focusVisible: ['#focus'],
      hover: ['#hover'],
    },
  },
  render: () => (
    <StateTable<TCheckboxPalette>
      caption='Palettes'
      defaultProps='primary'
      props={['primary', 'secondary', 'mono', 'danger', 'warning', 'success']}
      states={['normal', 'hover', 'focus', 'active', 'disabled']}
      getComponent={(palette, state) => (
        <Checkbox
          id={state}
          palette={palette}
          {...(state === 'active' && { checked: true })}
          disabled={state === 'disabled'}
        />
      )}
      getRowClassName={(prop) => (prop === 'secondary' ? 'bg-primary text-primary-foreground' : '')}
    />
  ),
}

export const Dimension: Story = {
  args: {},
  parameters: {
    pseudo: {
      active: ['#active'],
      focusVisible: ['#focus'],
      hover: ['#hover'],
    },
  },
  render: () => {
    return (
      <StateTable<TCheckboxSize>
        caption='Dimensions'
        defaultProps='md'
        props={['sm', 'md', 'lg']}
        getComponent={(size, state) => (
          <Checkbox
            id={state}
            dimension={size}
            {...(state === 'active' && { checked: true })}
            disabled={state === 'disabled'}
          />
        )}
      />
    )
  },
}
