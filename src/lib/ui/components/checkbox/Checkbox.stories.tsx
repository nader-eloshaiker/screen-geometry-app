import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { StateTable } from '../../storybook/StateTable'
import { Checkbox } from './Checkbox'
import { TCheckboxPalette, TCheckboxSize } from './CheckboxVariants'

const meta = {
  title: 'Elements/Checkbox',
  component: Checkbox,
  // tags: ['autodocs'],
  argTypes: {},
  args: { onClick: fn(), onFocus: fn(), onBlur: fn() },
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Palette: Story = {
  args: {},
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
      getRowClassName={(prop) => (prop === 'secondary' ? 'bg-card text-card-foreground' : '')}
    />
  ),
  parameters: {
    pseudo: {
      hover: ['#hover'],
      active: ['#active'],
      focusVisible: ['#focus'],
    },
  },
}

export const Dimension: Story = {
  args: {},
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
  parameters: {
    pseudo: {
      hover: ['#hover'],
      active: ['#active'],
      focusVisible: ['#focus'],
    },
  },
}
