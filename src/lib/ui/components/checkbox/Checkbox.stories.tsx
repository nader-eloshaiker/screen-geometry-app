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
  render: () => {
    const palettes: Array<TCheckboxPalette> = ['primary', 'secondary', 'neutral', 'danger', 'warning', 'success']

    return (
      <StateTable<TCheckboxPalette>
        caption='Palettes'
        defaultProps='primary'
        props={palettes}
        getComponent={(palette, state) => (
          <div className='flex gap-3'>
            <Checkbox id={state} palette={palette} disabled={state === 'disabled'} />
            <Checkbox id={state} palette={palette} checked disabled={state === 'disabled'} />
          </div>
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

export const Size: Story = {
  args: {},
  render: () => {
    const sizes: Array<TCheckboxSize> = ['sm', 'md', 'lg']

    return (
      <StateTable<TCheckboxSize>
        caption='Sizes'
        defaultProps='md'
        props={sizes}
        getComponent={(size, state) => (
          <div className='flex gap-3'>
            <Checkbox id={state} dimension={size} disabled={state === 'disabled'} />
            <Checkbox id={state} dimension={size} checked disabled={state === 'disabled'} />
          </div>
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
