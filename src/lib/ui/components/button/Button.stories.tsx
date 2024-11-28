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
  render: () => {
    const palettes: Array<TButtonPalette> = ['primary', 'secondary', 'neutral', 'danger', 'warning', 'success']

    return (
      <StateTable<TButtonPalette>
        caption='Palettes'
        defaultProps='primary'
        props={palettes}
        getComponent={(prop, state) => <TestButton id={state} palette={prop} disabled={state === 'disabled'} />}
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

export const Mode: Story = {
  args: {},
  render: () => {
    const modes: Array<TButtonMode> = ['button', 'outline', 'ghost', 'link']

    return (
      <StateTable<TButtonMode>
        caption='Modes'
        defaultProps='button'
        props={modes}
        getComponent={(prop, state) => <TestButton id={state} mode={prop} disabled={state === 'disabled'} />}
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
    const sizes: Array<TButtonSize> = ['sm', 'md', 'lg']

    return (
      <StateTable<TButtonSize>
        caption='Sizes'
        defaultProps='md'
        props={sizes}
        getComponent={(prop, state) => <TestButton id={state} dimension={prop} disabled={state === 'disabled'} />}
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
