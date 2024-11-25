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
            normalDefault: <TestButton intent='primary' />,
            hoverDefault: <TestButton id='hoverDefault' intent='primary' />,
            focusDefault: <TestButton id='focusDefault' intent='primary' />,
            activeDefault: <TestButton id='activeDefault' intent='primary' />,
            disabledDefault: <TestButton disabled={true} id='disabledDefault' intent='primary' />,
          },
        },
        {
          rowName: 'secondary',
          rows: {
            normalSecondary: <TestButton intent='secondary' />,
            hoverSecondary: <TestButton id='hoverSecondary' intent='secondary' />,
            focusSecondary: <TestButton id='focusSecondary' intent='secondary' />,
            activeSecondary: <TestButton id='activeSecondary' intent='secondary' />,
            disabledSecondary: <TestButton disabled={true} id='disabledSecondary' intent='secondary' />,
          },
        },
        {
          rowName: 'destructive',
          rows: {
            normalSecondary: <TestButton intent='destructive' />,
            hoverSecondary: <TestButton id='hoverDestructive' intent='destructive' />,
            focusSecondary: <TestButton id='focusDestructive' intent='destructive' />,
            activeSecondary: <TestButton id='activeDestructive' intent='destructive' />,
            disabledSecondary: <TestButton disabled={true} id='disabledDestructive' intent='destructive' />,
          },
        },
        {
          rowName: 'outline',
          rows: {
            normalSecondary: <TestButton intent='outline' />,
            hoverSecondary: <TestButton id='hoverOutline' intent='outline' />,
            focusSecondary: <TestButton id='focusOutline' intent='outline' />,
            activeSecondary: <TestButton id='activeOutline' intent='outline' />,
            disabledSecondary: <TestButton disabled={true} id='disabledOutline' intent='outline' />,
          },
        },
        {
          rowName: 'ghost',
          rows: {
            normalSecondary: <TestButton intent='ghost' />,
            hoverSecondary: <TestButton id='hoverGhost' intent='ghost' />,
            focusSecondary: <TestButton id='focusGhost' intent='ghost' />,
            activeSecondary: <TestButton id='activeGhost' intent='ghost' />,
            disabledSecondary: <TestButton disabled={true} id='disabledGhost' intent='ghost' />,
          },
        },
        {
          rowName: 'link',
          rows: {
            normalSecondary: <TestButton intent='link' />,
            hoverSecondary: <TestButton id='hoverLink' intent='link' />,
            focusSecondary: <TestButton id='focusLink' intent='link' />,
            activeSecondary: <TestButton id='activeLink' intent='link' />,
            disabledSecondary: <TestButton disabled={true} id='disabledLink' intent='link' />,
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
            normalDefault: <TestIconButton intent='primary' size='icon' />,
            hoverDefault: <TestIconButton id='hoverDefault' intent='primary' size='icon' />,
            focusDefault: <TestIconButton id='focusDefault' intent='primary' size='icon' />,
            activeDefault: <TestIconButton id='activeDefault' intent='primary' size='icon' />,
            disabledDefault: <TestIconButton disabled={true} id='disabledDefault' intent='primary' size='icon' />,
          },
        },
        {
          rowName: 'size:sm',
          rows: {
            normalDefault: <TestButton intent='primary' size='sm' />,
            hoverDefault: <TestButton id='hoverDefault' intent='primary' size='sm' />,
            focusDefault: <TestButton id='focusDefault' intent='primary' size='sm' />,
            activeDefault: <TestButton id='activeDefault' intent='primary' size='sm' />,
            disabledDefault: <TestButton disabled={true} id='disabledDefault' intent='primary' size='sm' />,
          },
        },
        {
          rowName: 'size:md',
          rows: {
            normalDefault: <TestButton intent='primary' size='md' />,
            hoverDefault: <TestButton id='hoverDefault' intent='primary' size='md' />,
            focusDefault: <TestButton id='focusDefault' intent='primary' size='md' />,
            activeDefault: <TestButton id='activeDefault' intent='primary' size='md' />,
            disabledDefault: <TestButton disabled={true} id='disabledDefault' intent='primary' size='md' />,
          },
        },
        {
          rowName: 'size:lg',
          rows: {
            normalDefault: <TestButton intent='primary' size='lg' />,
            hoverDefault: <TestButton id='hoverDefault' intent='primary' size='lg' />,
            focusDefault: <TestButton id='focusDefault' intent='primary' size='lg' />,
            activeDefault: <TestButton id='activeDefault' intent='primary' size='lg' />,
            disabledDefault: <TestButton disabled={true} id='disabledDefault' intent='primary' size='lg' />,
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
