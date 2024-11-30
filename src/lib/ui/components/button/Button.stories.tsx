import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { ThumbsUp } from 'lucide-react'
import { StateTable } from '../../storybook/StateTable'
import { Button, ButtonProps } from './Button'
import { TButtonMode, TButtonPalette, TButtonSize } from './ButtonVariants'

const TestButton = (props: ButtonProps) => {
  return (
    <Button className='flex gap-2' {...props}>
      <div className='self-center'>Button</div>
      <ThumbsUp className='self-center' />
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
      props={['primary', 'secondary', 'neutral', 'danger', 'warning', 'success']}
      getComponent={(prop, state) => <TestButton id={state} palette={prop} disabled={state === 'disabled'} />}
      getRowClassName={(prop) => (prop === 'secondary' ? 'bg-primary' : '')}
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
