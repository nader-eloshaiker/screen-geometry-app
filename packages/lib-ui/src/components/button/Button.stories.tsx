import { StateTable } from '@/storybook/StateTable'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThumbsUp } from 'lucide-react'
import { fn } from 'storybook/test'
import { Button } from './Button'
import type { TButtonMode, TButtonPalette, TButtonSize } from './ButtonVariants'

const meta = {
  args: { onClick: fn(), onFocus: fn(), onMouseEnter: fn(), onMouseLeave: fn() },
  // tags: ['autodocs'],
  argTypes: {},
  component: Button,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  title: 'Elements/Buttons',
} satisfies Meta<typeof Button>

export default meta
export type Story = StoryObj<typeof meta>

export const Palette: Story = {
  args: {},
  parameters: {
    pseudo: {
      focusVisible: ['#focus'],
      hover: ['#hover'],
    },
  },
  render: () => (
    <StateTable<TButtonPalette>
      caption='Palettes'
      defaultProps='primary'
      props={['primary', 'secondary', 'mono', 'danger', 'warning', 'success']}
      states={['normal', 'hover', 'focus', 'active', 'disabled']}
      getComponent={(prop, state) => (
        <Button id={state} palette={prop} active={state === 'active'} disabled={state === 'disabled'}>
          <div>Button</div>
          <ThumbsUp />
        </Button>
      )}
      getRowClassName={(prop) => (prop === 'secondary' ? 'bg-primary text-primary-foreground' : '')}
    />
  ),
}

export const Mode: Story = {
  args: {},
  parameters: {
    pseudo: {
      active: ['#active'],
      focusVisible: ['#focus'],
      hover: ['#hover'],
    },
  },
  render: () => (
    <StateTable<TButtonMode>
      caption='Modes'
      defaultProps='button'
      props={['button', 'outline', 'ghost', 'link']}
      states={['normal', 'hover', 'focus', 'active', 'disabled']}
      getComponent={(prop, state) => (
        <Button id={state} mode={prop} active={state === 'active'} disabled={state === 'disabled'}>
          <div>Button</div>
          <ThumbsUp />
        </Button>
      )}
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
  render: () => (
    <StateTable<TButtonSize>
      caption='Dimensions'
      defaultProps='md'
      props={['sm', 'md', 'lg']}
      states={['normal', 'hover', 'focus', 'active', 'disabled']}
      getComponent={(prop, state) => (
        <Button id={state} dimension={prop} active={state === 'active'} disabled={state === 'disabled'}>
          <div>Button</div>
          <ThumbsUp />
        </Button>
      )}
    />
  ),
}
