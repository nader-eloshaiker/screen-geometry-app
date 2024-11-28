import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { ThumbsUp } from 'lucide-react'
import { StateTable } from '../../storybook/StateTable'
import { Button, ButtonProps } from './Button'

const TestButton = (props: ButtonProps) => {
  return (
    <Button className='flex gap-2' {...props}>
      <div className='self-center'>Button</div>
      <ThumbsUp className='self-center' />
    </Button>
  )
}

const TestIconButton = (props: ButtonProps) => {
  return (
    <Button className='flex gap-2' {...props}>
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
    <StateTable
      caption='Button Palettes'
      headerTitles={['normal', 'hover', 'focus', 'active', 'disabled']}
      rows={[
        {
          rowName: 'primary*',
          data: {
            1: <TestButton id='normal' palette='primary' />,
            2: <TestButton id='hover' palette='primary' />,
            3: <TestButton id='focus' palette='primary' />,
            4: <TestButton id='active' palette='primary' />,
            5: <TestButton disabled={true} id='disabled' palette='primary' />,
          },
        },
        {
          rowName: 'secondary',
          data: {
            1: <TestButton id='normal' palette='secondary' />,
            2: <TestButton id='hover' palette='secondary' />,
            3: <TestButton id='focus' palette='secondary' />,
            4: <TestButton id='active' palette='secondary' />,
            5: <TestButton disabled={true} id='disabled' palette='secondary' />,
          },
        },
        {
          rowName: 'neutral',
          data: {
            1: <TestButton id='normal' palette='neutral' />,
            2: <TestButton id='hover' palette='neutral' />,
            3: <TestButton id='focus' palette='neutral' />,
            4: <TestButton id='active' palette='neutral' />,
            5: <TestButton disabled={true} id='disabled' palette='neutral' />,
          },
        },
        {
          rowName: 'danger',
          data: {
            1: <TestButton id='normal' palette='danger' />,
            2: <TestButton id='hover' palette='danger' />,
            3: <TestButton id='focus' palette='danger' />,
            4: <TestButton id='active' palette='danger' />,
            5: <TestButton disabled={true} id='disabled' palette='danger' />,
          },
        },
        {
          rowName: 'success',
          data: {
            1: <TestButton id='normal' palette='success' />,
            2: <TestButton id='hover' palette='success' />,
            3: <TestButton id='focus' palette='success' />,
            4: <TestButton id='active' palette='success' />,
            5: <TestButton disabled={true} id='disabled' palette='success' />,
          },
        },
        {
          rowName: 'warning',
          data: {
            1: <TestButton id='normal' palette='warning' />,
            2: <TestButton id='hover' palette='warning' />,
            3: <TestButton id='focus' palette='warning' />,
            4: <TestButton id='active' palette='warning' />,
            5: <TestButton disabled={true} id='disabled' palette='warning' />,
          },
        },
      ]}
    />
  ),
  parameters: {
    pseudo: {
      hover: ['#hover'],
      active: ['#active'],
      focusVisible: ['#focus'],
    },
    layout: 'centered',
    // viewport: {
    //   defaultViewport: 'FullScreen',
    // },
  },
}

export const Mode: Story = {
  args: {},
  render: () => (
    <StateTable
      caption='Button Modes'
      headerTitles={['normal', 'hover', 'focus', 'active', 'disabled']}
      rows={[
        {
          rowName: 'button*',
          data: {
            1: <TestButton id='normal' mode='button' />,
            2: <TestButton id='hover' mode='button' />,
            3: <TestButton id='focus' mode='button' />,
            4: <TestButton id='active' mode='button' />,
            5: <TestButton disabled={true} id='disabled' mode='button' />,
          },
        },
        {
          rowName: 'outline',
          data: {
            1: <TestButton id='normal' mode='outline' />,
            2: <TestButton id='hover' mode='outline' />,
            3: <TestButton id='focus' mode='outline' />,
            4: <TestButton id='active' mode='outline' />,
            5: <TestButton disabled={true} id='disabled' mode='outline' />,
          },
        },
        {
          rowName: 'ghost',
          data: {
            1: <TestButton id='normal' mode='ghost' />,
            2: <TestButton id='hover' mode='ghost' />,
            3: <TestButton id='focus' mode='ghost' />,
            4: <TestButton id='active' mode='ghost' />,
            5: <TestButton disabled={true} id='disabled' mode='ghost' />,
          },
        },
        {
          rowName: 'link',
          data: {
            1: <TestButton id='normal' mode='link' />,
            2: <TestButton id='hover' mode='link' />,
            3: <TestButton id='focus' mode='link' />,
            4: <TestButton id='active' mode='link' />,
            5: <TestButton disabled={true} id='disabled' mode='link' />,
          },
        },
      ]}
    />
  ),
  parameters: {
    pseudo: {
      hover: ['#hover'],
      active: ['#active'],
      focusVisible: ['#focus'],
    },
    layout: 'centered',
    // viewport: {
    //   defaultViewport: 'FullScreen',
    // },
  },
}

export const Size: Story = {
  args: {},
  render: () => (
    <StateTable
      caption='Button Sizes'
      headerTitles={['normal', 'hover', 'focus', 'active', 'disabled']}
      rows={[
        {
          rowName: 'icon',
          data: {
            1: <TestIconButton id='normal' size='icon' />,
            2: <TestIconButton id='hover' size='icon' />,
            3: <TestIconButton id='focus' size='icon' />,
            4: <TestIconButton id='active' size='icon' />,
            5: <TestIconButton disabled={true} id='disabled' size='icon' />,
          },
        },
        {
          rowName: 'sm',
          data: {
            1: <TestButton id='normal' size='sm' />,
            2: <TestButton id='hover' size='sm' />,
            3: <TestButton id='focus' size='sm' />,
            4: <TestButton id='active' size='sm' />,
            5: <TestButton disabled={true} id='disabled' size='sm' />,
          },
        },
        {
          rowName: 'md*',
          data: {
            1: <TestButton id='normal' size='md' />,
            2: <TestButton id='hover' size='md' />,
            3: <TestButton id='focus' size='md' />,
            4: <TestButton id='active' size='md' />,
            5: <TestButton disabled={true} id='disabled' size='md' />,
          },
        },
        {
          rowName: 'lg',
          data: {
            1: <TestButton id='normal' size='lg' />,
            2: <TestButton id='hover' size='lg' />,
            3: <TestButton id='focus' size='lg' />,
            4: <TestButton id='active' size='lg' />,
            5: <TestButton disabled={true} id='disabled' size='lg' />,
          },
        },
      ]}
    />
  ),
  parameters: {
    pseudo: {
      hover: ['#hover'],
      active: ['#active'],
      focusVisible: ['#focus'],
    },
    layout: 'centered',
    // viewport: {
    //   defaultViewport: 'FullScreen',
    // },
  },
}
