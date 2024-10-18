import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { ThumbsUp } from 'lucide-react'
import { ReactNode } from 'react'
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
  component: TestButton,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='flex size-full items-center justify-center'>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
  args: { onClick: fn() },
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof TestButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button',
  },
  parameters: {},
  render: (args) => <Button {...args} />,
}

const TableRow = ({ heading, elements }: { heading: string; elements: Record<string, ReactNode> }) => {
  return (
    <tr className='border border-dashed border-base-300'>
      <td className='px-8 py-4 text-right text-sm font-bold' scope='row'>
        {heading}
      </td>
      {Object.entries(elements).map(([key, element]) => (
        <td key={key} className='px-8 py-4'>
          {element}
        </td>
      ))}
    </tr>
  )
}

export const Variant: Story = {
  args: {},
  render: () => (
    <table className='border border-dashed border-base-300'>
      <caption className='p-5'>Button Variants</caption>
      <thead>
        <tr className='border border-dashed border-base-300'>
          <th className='px-8 py-4' scope='col'></th>
          <th className='px-8 py-4' scope='col'>
            normal
          </th>
          <th className='px-8 py-4' scope='col'>
            hover
          </th>
          <th className='px-8 py-4' scope='col'>
            focus
          </th>
          <th className='px-8 py-4' scope='col'>
            active
          </th>
          <th className='px-8 py-4' scope='col'>
            disabled
          </th>
        </tr>
      </thead>
      <tbody>
        <TableRow
          heading='primary (default)'
          elements={{
            normalDefault: <TestButton variant='primary' />,
            hoverDefault: <TestButton id='hoverDefault' variant='primary' />,
            focusDefault: <TestButton id='focusDefault' variant='primary' />,
            activeDefault: <TestButton id='activeDefault' variant='primary' />,
            disabledDefault: <TestButton disabled={true} id='disabledDefault' variant='primary' />,
          }}
        />

        <TableRow
          heading='ghost'
          elements={{
            normalGhost: <TestButton variant='ghost' />,
            hoverGhost: <TestButton id='hoverGhost' variant='ghost' />,
            focusGhost: <TestButton id='focusGhost' variant='ghost' />,
            activeGhost: <TestButton id='activeGhost' variant='ghost' />,
            disabledGhost: <TestButton disabled={true} id='disabledGhost' variant='ghost' />,
          }}
        />

        <TableRow
          heading='secondary'
          elements={{
            normalSecondary: <TestButton variant='secondary' />,
            hoverSecondary: <TestButton id='hoverSecondary' variant='secondary' />,
            focusSecondary: <TestButton id='focusSecondary' variant='secondary' />,
            activeSecondary: <TestButton id='activeSecondary' variant='secondary' />,
            disabledSecondary: <TestButton disabled={true} id='disabledSecondary' variant='secondary' />,
          }}
        />

        <TableRow
          heading='destructive'
          elements={{
            normalDestructive: <TestButton variant='destructive' />,
            hoverDestructive: <TestButton id='hoverDestructive' variant='destructive' />,
            focusDestructive: <TestButton id='focusDestructive' variant='destructive' />,
            activeDestructive: <TestButton id='activeDestructive' variant='destructive' />,
            disabledDestructive: <TestButton disabled={true} id='disabledDestructive' variant='destructive' />,
          }}
        />

        <TableRow
          heading='outline'
          elements={{
            normalOutline: <TestButton variant='outline' />,
            hoverOutline: <TestButton id='hoverOutline' variant='outline' />,
            focusOutline: <TestButton id='focusOutline' variant='outline' />,
            activeOutline: <TestButton id='activeOutline' variant='outline' />,
            disabledOutline: <TestButton disabled={true} id='disabledOutline' variant='outline' />,
          }}
        />

        <TableRow
          heading='link'
          elements={{
            normalLink: <TestButton variant='link' />,
            hoverLink: <TestButton id='hoverLink' variant='link' />,
            focusLink: <TestButton id='focusLink' variant='link' />,
            activeLink: <TestButton id='activeLink' variant='link' />,
            disabledLink: <TestButton disabled={true} id='disabledLink' variant='link' />,
          }}
        />
      </tbody>
    </table>
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

export const Size: Story = {
  args: {},
  render: () => (
    <table className='border border-dashed border-base-300'>
      <caption className='p-5'>Button Sizes</caption>
      <thead>
        <tr className='border border-dashed border-base-300'>
          <th className='px-8 py-4' scope='col'></th>
          <th className='px-8 py-4' scope='col'>
            normal
          </th>
          <th className='px-8 py-4' scope='col'>
            hover
          </th>
          <th className='px-8 py-4' scope='col'>
            focus
          </th>
          <th className='px-8 py-4' scope='col'>
            active
          </th>
          <th className='px-8 py-4' scope='col'>
            disabled
          </th>
        </tr>
      </thead>
      <tbody>
        <TableRow
          heading='size:icon'
          elements={{
            normalDefault: <TestIconButton variant='primary' size='icon' />,
            hoverDefault: <TestIconButton id='hoverDefault' variant='primary' size='icon' />,
            focusDefault: <TestIconButton id='focusDefault' variant='primary' size='icon' />,
            activeDefault: <TestIconButton id='activeDefault' variant='primary' size='icon' />,
            disabledDefault: <TestIconButton disabled={true} id='disabledDefault' variant='primary' size='icon' />,
          }}
        />

        <TableRow
          heading='size:sm'
          elements={{
            normalDefault: <TestButton variant='primary' size='sm' />,
            hoverDefault: <TestButton id='hoverDefault' variant='primary' size='sm' />,
            focusDefault: <TestButton id='focusDefault' variant='primary' size='sm' />,
            activeDefault: <TestButton id='activeDefault' variant='primary' size='sm' />,
            disabledDefault: <TestButton disabled={true} id='disabledDefault' variant='primary' size='sm' />,
          }}
        />

        <TableRow
          heading='size:md (default)'
          elements={{
            normalDefault: <TestButton variant='primary' size='md' />,
            hoverDefault: <TestButton id='hoverDefault' variant='primary' size='md' />,
            focusDefault: <TestButton id='focusDefault' variant='primary' size='md' />,
            activeDefault: <TestButton id='activeDefault' variant='primary' size='md' />,
            disabledDefault: <TestButton disabled={true} id='disabledDefault' variant='primary' size='md' />,
          }}
        />

        <TableRow
          heading='size:lg'
          elements={{
            normalDefault: <TestButton variant='primary' size='lg' />,
            hoverDefault: <TestButton id='hoverDefault' variant='primary' size='lg' />,
            focusDefault: <TestButton id='focusDefault' variant='primary' size='lg' />,
            activeDefault: <TestButton id='activeDefault' variant='primary' size='lg' />,
            disabledDefault: <TestButton disabled={true} id='disabledDefault' variant='primary' size='lg' />,
          }}
        />
      </tbody>
    </table>
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
