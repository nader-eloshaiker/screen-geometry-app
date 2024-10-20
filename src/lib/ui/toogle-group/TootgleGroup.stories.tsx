import { FontBoldIcon, FontItalicIcon } from '@radix-ui/react-icons'
import { ToggleGroupSingleProps } from '@radix-ui/react-toggle-group'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import type { VariantProps } from 'class-variance-authority'
import { UnderlineIcon } from 'lucide-react'
import { StateTable } from '../storybook/StateTable'
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup'
import { ToggleVariants } from './ToggleVariants'

type ToggleGroupDefaultProps = { type: 'multiple' | 'single' } & VariantProps<typeof ToggleVariants> & TRestProps

const ToggleGroupDefault = ({ type, idRef, ...variants }: ToggleGroupDefaultProps) => {
  return (
    <ToggleGroup type={type as ToggleGroupSingleProps['type']} {...variants} defaultValue='bold'>
      <ToggleGroupItem value='bold' aria-label='Toggle bold' id={`${idRef}-bold`}>
        <FontBoldIcon className='size-4' />
      </ToggleGroupItem>
      <ToggleGroupItem value='italic' aria-label='Toggle italic' id={`${idRef}-italic`}>
        <FontItalicIcon className='size-4' />
      </ToggleGroupItem>
      <ToggleGroupItem value='strikethrough' aria-label='Toggle strikethrough' id={`${idRef}-strikethrough`}>
        <UnderlineIcon className='size-4' />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

const meta = {
  title: 'Elements/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  args: { onClick: fn(), onMouseEnter: fn(), onMouseLeave: fn(), onFocus: fn(), type: 'single' },
  argTypes: {},
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

export const SelectionMode: Story = {
  args: {},
  render: () => (
    <StateTable
      caption='Selection Mode'
      headerTitles={['default', 'disabled']}
      rows={[
        {
          rowName: 'single',
          rows: {
            default: <ToggleGroupDefault type='single' />,
            disabled: <ToggleGroupDefault type='single' disabled={true} />,
          },
        },
        {
          rowName: 'multiple',
          rows: {
            default: <ToggleGroupDefault type='multiple' />,
            disabled: <ToggleGroupDefault type='multiple' disabled={true} />,
          },
        },
      ]}
    />
  ),
}

export const Variant: Story = {
  args: {},
  render: () => (
    <StateTable
      caption='Button Variants'
      headerTitles={['default', 'hover', 'focus', 'active', 'disabled']}
      rows={[
        {
          rowName: 'default',
          rows: {
            default: <ToggleGroupDefault type='multiple' idRef='defaultNormal' variant={'default'} />,
            hover: <ToggleGroupDefault type='multiple' idRef='hoverNormal' variant={'default'} />,
            focus: <ToggleGroupDefault type='multiple' idRef='focusNormal' variant={'default'} />,
            active: <ToggleGroupDefault type='multiple' idRef='activeNormal' variant={'default'} />,
            disabled: <ToggleGroupDefault type='multiple' idRef='disabledNormal' variant={'default'} disabled={true} />,
          },
        },
        {
          rowName: 'outline',
          rows: {
            default: <ToggleGroupDefault type='multiple' idRef='defaultOutline' variant={'outline'} />,
            hover: <ToggleGroupDefault type='multiple' idRef='hoverOutline' variant={'outline'} />,
            focus: <ToggleGroupDefault type='multiple' idRef='focusOutline' variant={'outline'} />,
            active: <ToggleGroupDefault type='multiple' idRef='activeOutline' variant={'outline'} />,
            disabled: (
              <ToggleGroupDefault type='multiple' idRef='disabledOutline' variant={'outline'} disabled={true} />
            ),
          },
        },
        {
          rowName: 'pill',
          rows: {
            default: <ToggleGroupDefault type='multiple' idRef='defaultPill' variant={'pill'} />,
            hover: <ToggleGroupDefault type='multiple' idRef='hoverPill' variant={'pill'} />,
            focus: <ToggleGroupDefault type='multiple' idRef='focusPill' variant={'pill'} />,
            active: <ToggleGroupDefault type='multiple' idRef='activePill' variant={'pill'} />,
            disabled: <ToggleGroupDefault type='multiple' idRef='disabledPill' variant={'pill'} disabled={true} />,
          },
        },
      ]}
    />
  ),
  parameters: {
    pseudo: {
      hover: ['#hoverNormal-bold', '#hoverOutline-bold', '#hoverPill-bold'],
      active: ['#activeNormal-bold', '#activeOutline-bold', '#activePill-bold'],
      focusVisible: ['#focusNormal-bold', '#focusOutline-bold', '#focusPill-bold'],
    },
  },
}

export const Size: Story = {
  args: {},
  render: () => (
    <StateTable
      caption='Button Sizes'
      headerTitles={['default', 'outline', 'pill']}
      rows={[
        {
          rowName: 'sm',
          rows: {
            default: <ToggleGroupDefault type='single' size='sm' />,
            outline: <ToggleGroupDefault type='single' variant={'outline'} size='sm' />,
            pill: <ToggleGroupDefault type='single' variant={'pill'} size='sm' />,
          },
        },
        {
          rowName: 'default',
          rows: {
            default: <ToggleGroupDefault type='single' size='default' />,
            outline: <ToggleGroupDefault type='single' variant={'outline'} size='default' />,
            pill: <ToggleGroupDefault type='single' variant={'pill'} size='default' />,
          },
        },
        {
          rowName: 'lg',
          rows: {
            default: <ToggleGroupDefault type='single' size='lg' />,
            outline: <ToggleGroupDefault type='single' variant={'outline'} size='lg' />,
            pill: <ToggleGroupDefault type='single' variant={'pill'} size='lg' />,
          },
        },
      ]}
    />
  ),
}
