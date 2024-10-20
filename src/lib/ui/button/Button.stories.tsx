import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { ThumbsUp } from 'lucide-react'
import { StateTable } from '../storybook/StateTable'
import { Button, ButtonProps } from './Button'

export const TestButton = (props: ButtonProps) => {
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
  tags: ['autodocs'],
  argTypes: {},
  args: { onClick: fn(), onMouseEnter: fn(), onMouseLeave: fn(), onFocus: fn() },
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof Button>

export default meta
export type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button',
  },
  parameters: {},
  render: (args) => <Button {...args} />,
}

export const Variant: Story = {
  args: {},
  render: () => (
    <StateTable
      caption='Button Variants'
      headerTitles={['normal', 'hover', 'focus', 'active', 'disabled']}
      rows={[
        {
          rowName: 'primary (default)',
          rows: {
            normalDefault: <TestButton variant='primary' />,
            hoverDefault: <TestButton id='hoverDefault' variant='primary' />,
            focusDefault: <TestButton id='focusDefault' variant='primary' />,
            activeDefault: <TestButton id='activeDefault' variant='primary' />,
            disabledDefault: <TestButton disabled={true} id='disabledDefault' variant='primary' />,
          },
        },
        {
          rowName: 'secondary',
          rows: {
            normalSecondary: <TestButton variant='secondary' />,
            hoverSecondary: <TestButton id='hoverSecondary' variant='secondary' />,
            focusSecondary: <TestButton id='focusSecondary' variant='secondary' />,
            activeSecondary: <TestButton id='activeSecondary' variant='secondary' />,
            disabledSecondary: <TestButton disabled={true} id='disabledSecondary' variant='secondary' />,
          },
        },
        {
          rowName: 'accent',
          rows: {
            normalSecondary: <TestButton variant='accent' />,
            hoverSecondary: <TestButton id='hoverAccent' variant='accent' />,
            focusSecondary: <TestButton id='focusAccent' variant='accent' />,
            activeSecondary: <TestButton id='activeAccent' variant='accent' />,
            disabledSecondary: <TestButton disabled={true} id='disabledAccent' variant='accent' />,
          },
        },
        {
          rowName: 'destructive',
          rows: {
            normalSecondary: <TestButton variant='destructive' />,
            hoverSecondary: <TestButton id='hoverDestructive' variant='destructive' />,
            focusSecondary: <TestButton id='focusDestructive' variant='destructive' />,
            activeSecondary: <TestButton id='activeDestructive' variant='destructive' />,
            disabledSecondary: <TestButton disabled={true} id='disabledDestructive' variant='destructive' />,
          },
        },
        {
          rowName: 'outline',
          rows: {
            normalSecondary: <TestButton variant='outline' />,
            hoverSecondary: <TestButton id='hoverOutline' variant='outline' />,
            focusSecondary: <TestButton id='focusOutline' variant='outline' />,
            activeSecondary: <TestButton id='activeOutline' variant='outline' />,
            disabledSecondary: <TestButton disabled={true} id='disabledOutline' variant='outline' />,
          },
        },
        {
          rowName: 'ghost',
          rows: {
            normalSecondary: <TestButton variant='ghost' />,
            hoverSecondary: <TestButton id='hoverGhost' variant='ghost' />,
            focusSecondary: <TestButton id='focusGhost' variant='ghost' />,
            activeSecondary: <TestButton id='activeGhost' variant='ghost' />,
            disabledSecondary: <TestButton disabled={true} id='disabledGhost' variant='ghost' />,
          },
        },
        {
          rowName: 'link',
          rows: {
            normalSecondary: <TestButton variant='link' />,
            hoverSecondary: <TestButton id='hoverLink' variant='link' />,
            focusSecondary: <TestButton id='focusLink' variant='link' />,
            activeSecondary: <TestButton id='activeLink' variant='link' />,
            disabledSecondary: <TestButton disabled={true} id='disabledLink' variant='link' />,
          },
        },
      ]}
    />
  ),
  parameters: {
    pseudo: {
      hover: [
        '#hoverDefault',
        '#hoverSecondary',
        '#hoverGhost',
        '#hoverAccent',
        '#hoverDestructive',
        '#hoverOutline',
        '#hoverLink',
      ],
      active: [
        '#activeDefault',
        '#activeSecondary',
        '#activeAccent',
        '#activeGhost',
        '#activeDestructive',
        '#activeOutline',
        '#activeLink',
      ],
      focusVisible: [
        '#focusDefault',
        '#focusSecondary',
        '#focusAccent',
        '#focusGhost',
        '#focusDestructive',
        '#focusOutline',
        '#focusLink',
      ],
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
          rowName: 'size:icon',
          rows: {
            normalDefault: <TestIconButton variant='primary' size='icon' />,
            hoverDefault: <TestIconButton id='hoverDefault' variant='primary' size='icon' />,
            focusDefault: <TestIconButton id='focusDefault' variant='primary' size='icon' />,
            activeDefault: <TestIconButton id='activeDefault' variant='primary' size='icon' />,
            disabledDefault: <TestIconButton disabled={true} id='disabledDefault' variant='primary' size='icon' />,
          },
        },
        {
          rowName: 'size:sm',
          rows: {
            normalDefault: <TestButton variant='primary' size='sm' />,
            hoverDefault: <TestButton id='hoverDefault' variant='primary' size='sm' />,
            focusDefault: <TestButton id='focusDefault' variant='primary' size='sm' />,
            activeDefault: <TestButton id='activeDefault' variant='primary' size='sm' />,
            disabledDefault: <TestButton disabled={true} id='disabledDefault' variant='primary' size='sm' />,
          },
        },
        {
          rowName: 'size:md',
          rows: {
            normalDefault: <TestButton variant='primary' size='md' />,
            hoverDefault: <TestButton id='hoverDefault' variant='primary' size='md' />,
            focusDefault: <TestButton id='focusDefault' variant='primary' size='md' />,
            activeDefault: <TestButton id='activeDefault' variant='primary' size='md' />,
            disabledDefault: <TestButton disabled={true} id='disabledDefault' variant='primary' size='md' />,
          },
        },
        {
          rowName: 'size:lg',
          rows: {
            normalDefault: <TestButton variant='primary' size='lg' />,
            hoverDefault: <TestButton id='hoverDefault' variant='primary' size='lg' />,
            focusDefault: <TestButton id='focusDefault' variant='primary' size='lg' />,
            activeDefault: <TestButton id='activeDefault' variant='primary' size='lg' />,
            disabledDefault: <TestButton disabled={true} id='disabledDefault' variant='primary' size='lg' />,
          },
        },
      ]}
    />
  ),
  parameters: {
    pseudo: {
      hover: ['#hoverDefault', '#hoverGhost', '#hoverSecondary', '#hoverDestructive', '#hoverOutline', '#hoverLink'],
      active: [
        '#activeDefault',
        '#activeGhost',
        '#activeSecondary',
        '#activeDestructive',
        '#activeOutline',
        '#activeLink',
      ],
      focusVisible: [
        '#focusDefault',
        '#focusGhost',
        '#focusSecondary',
        '#focusDestructive',
        '#focusOutline',
        '#focusLink',
      ],
    },
    layout: 'centered',
    // viewport: {
    //   defaultViewport: 'FullScreen',
    // },
  },
}
