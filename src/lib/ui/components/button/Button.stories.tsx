import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { ThumbsUp } from 'lucide-react'
import { StateTable } from '../../storybook/StateTable'
import { Button, ButtonProps } from './Button'
import { TButtonMode, TButtonPalette, TButtonSize } from './ButtonVariants'

const TestButton = (props: ButtonProps) => {
  return (
    <Button {...props}>
      <div>Button</div>
      <ThumbsUp />
    </Button>
  )
}

const meta = {
  title: 'Elements/Buttons',
  component: Button,
  // tags: ['autodocs'],
  argTypes: {},
  args: { onClick: fn(), onMouseEnter: fn(), onMouseLeave: fn(), onFocus: fn() },
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof Button>

export default meta
export type Story = StoryObj<typeof meta>

export const Palette: Story = {
  args: {},
  render: () => (
    <StateTable<TButtonPalette>
      caption='Palettes'
      defaultProps='primary'
      props={['primary', 'secondary', 'mono', 'danger', 'warning', 'success']}
      states={['normal', 'hover', 'focus', 'active', 'disabled']}
      getComponent={(prop, state) => <TestButton id={state} palette={prop} disabled={state === 'disabled'} />}
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

export const Mode: Story = {
  args: {},
  render: () => (
    <StateTable<TButtonMode>
      caption='Modes'
      defaultProps='button'
      props={['button', 'outline', 'ghost', 'link']}
      states={['normal', 'hover', 'focus', 'active', 'disabled']}
      getComponent={(prop, state) => <TestButton id={state} mode={prop} disabled={state === 'disabled'} />}
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
  render: () => (
    <StateTable<TButtonSize>
      caption='Dimensions'
      defaultProps='md'
      props={['sm', 'md', 'lg']}
      states={['normal', 'hover', 'focus', 'active', 'disabled']}
      getComponent={(prop, state) => <TestButton id={state} dimension={prop} disabled={state === 'disabled'} />}
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
