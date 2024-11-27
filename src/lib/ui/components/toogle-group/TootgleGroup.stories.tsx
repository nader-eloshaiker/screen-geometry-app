import { ToggleGroupSingleProps } from '@radix-ui/react-toggle-group'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import type { VariantProps } from 'class-variance-authority'
import { StateTable } from '../../storybook/StateTable'
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup'
import { ToggleVariants } from './ToggleVariants'

type ToggleGroupDefaultProps = { type: 'multiple' | 'single' } & VariantProps<typeof ToggleVariants> & TRestProps

const ToggleGroupDefault = ({ type, idRef, ...variants }: ToggleGroupDefaultProps) => {
  return (
    <ToggleGroup type={type as ToggleGroupSingleProps['type']} {...variants}>
      <ToggleGroupItem value='bold' aria-label='Toggle bold' id={`${idRef}-bold`}>
        <div className='font-bold'>B</div>
      </ToggleGroupItem>
      <ToggleGroupItem value='italic' aria-label='Toggle italic' id={`${idRef}-italic`}>
        <div className='italic'>I</div>
      </ToggleGroupItem>
      <ToggleGroupItem value='underline' aria-label='Toggle underline' id={`${idRef}-underline`}>
        <div className='underline underline-offset-2'>U</div>
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

const meta = {
  title: 'Elements/ToggleGroup',
  component: ToggleGroup,
  // tags: ['autodocs'],
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
      headerTitles={['normal', 'disabled']}
      rows={[
        {
          rowName: 'single',
          data: {
            normal: <ToggleGroupDefault type='single' defaultValue='bold' />,
            disabled: <ToggleGroupDefault type='single' defaultValue='bold' disabled={true} />,
          },
        },
        {
          rowName: 'multiple',
          data: {
            normal: <ToggleGroupDefault type='multiple' defaultValue={['bold', 'underline']} />,
            disabled: <ToggleGroupDefault type='multiple' defaultValue={['bold', 'underline']} disabled={true} />,
          },
        },
      ]}
    />
  ),
}

export const Palette: Story = {
  args: {},
  render: () => (
    <StateTable
      caption='Toggle Group Palette'
      headerTitles={['normal', 'hover', 'focus', 'active', 'disabled']}
      rows={[
        {
          rowName: 'primary*',
          data: {
            1: <ToggleGroupDefault type='multiple' idRef='normal' palette={'primary'} />,
            2: <ToggleGroupDefault type='multiple' idRef='hover' palette={'primary'} />,
            3: <ToggleGroupDefault type='multiple' idRef='focus' palette={'primary'} />,
            4: <ToggleGroupDefault type='multiple' idRef='active' palette={'primary'} defaultValue='underline' />,
            5: <ToggleGroupDefault type='multiple' idRef='disabled' palette={'primary'} disabled={true} />,
          },
        },
        {
          rowName: 'secondary',
          data: {
            1: <ToggleGroupDefault type='multiple' idRef='normal' palette='secondary' />,
            2: <ToggleGroupDefault type='multiple' idRef='hover' palette='secondary' />,
            3: <ToggleGroupDefault type='multiple' idRef='focus' palette='secondary' />,
            4: <ToggleGroupDefault type='multiple' idRef='active' palette='secondary' defaultValue='underline' />,
            5: <ToggleGroupDefault type='multiple' idRef='disabled' palette='secondary' disabled={true} />,
          },
        },
        {
          rowName: 'neutral',
          data: {
            1: <ToggleGroupDefault type='multiple' idRef='normal' palette='neutral' />,
            2: <ToggleGroupDefault type='multiple' idRef='hover' palette='neutral' />,
            3: <ToggleGroupDefault type='multiple' idRef='focus' palette='neutral' />,
            4: <ToggleGroupDefault type='multiple' idRef='active' palette='neutral' defaultValue='underline' />,
            5: <ToggleGroupDefault type='multiple' idRef='disabled' palette='neutral' disabled={true} />,
          },
        },
      ]}
    />
  ),
  parameters: {
    pseudo: {
      hover: ['#hover-underline'],
      active: ['#active-underline'],
      focusVisible: ['#focus-underline'],
    },
  },
}

export const Mode: Story = {
  args: {},
  render: () => (
    <StateTable
      caption='Toggle Group Modes'
      headerTitles={['normal', 'hover', 'focus', 'active', 'disabled']}
      rows={[
        {
          rowName: 'button *',
          data: {
            1: <ToggleGroupDefault type='multiple' idRef='normal' mode={'button'} />,
            2: <ToggleGroupDefault type='multiple' idRef='hover' mode={'button'} />,
            3: <ToggleGroupDefault type='multiple' idRef='focus' mode={'button'} />,
            4: <ToggleGroupDefault type='multiple' idRef='active' mode={'button'} defaultValue='underline' />,
            5: <ToggleGroupDefault type='multiple' idRef='disabled' mode={'button'} disabled={true} />,
          },
        },
        {
          rowName: 'outline',
          data: {
            1: <ToggleGroupDefault type='multiple' idRef='normal' mode={'outline'} />,
            2: <ToggleGroupDefault type='multiple' idRef='hover' mode={'outline'} />,
            3: <ToggleGroupDefault type='multiple' idRef='focus' mode={'outline'} />,
            4: <ToggleGroupDefault type='multiple' idRef='active' mode={'outline'} defaultValue='underline' />,
            5: <ToggleGroupDefault type='multiple' idRef='disabled' mode={'outline'} disabled={true} />,
          },
        },
        {
          rowName: 'pill',
          data: {
            1: <ToggleGroupDefault type='multiple' idRef='normal' mode={'pill'} />,
            2: <ToggleGroupDefault type='multiple' idRef='hover' mode={'pill'} />,
            3: <ToggleGroupDefault type='multiple' idRef='focus' mode={'pill'} />,
            4: <ToggleGroupDefault type='multiple' idRef='active' mode={'pill'} defaultValue='underline' />,
            5: <ToggleGroupDefault type='multiple' idRef='disabled' mode={'pill'} disabled={true} />,
          },
        },
      ]}
    />
  ),
  parameters: {
    pseudo: {
      hover: ['#hover-underline'],
      active: ['#active-underline'],
      focusVisible: ['#focus-underline'],
    },
  },
}

export const Size: Story = {
  args: {},
  render: () => (
    <StateTable
      caption=' Sizes'
      headerTitles={['button *', 'outline', 'pill']}
      rows={[
        {
          rowName: 'sm',
          data: {
            1: <ToggleGroupDefault type='single' size='sm' />,
            2: <ToggleGroupDefault type='single' mode={'outline'} size='sm' />,
            3: <ToggleGroupDefault type='single' mode={'pill'} size='sm' />,
          },
        },
        {
          rowName: 'md *',
          data: {
            1: <ToggleGroupDefault type='single' size='md' />,
            2: <ToggleGroupDefault type='single' mode={'outline'} size='md' />,
            3: <ToggleGroupDefault type='single' mode={'pill'} size='md' />,
          },
        },
        {
          rowName: 'lg',
          data: {
            1: <ToggleGroupDefault type='single' size='lg' />,
            2: <ToggleGroupDefault type='single' mode={'outline'} size='lg' />,
            3: <ToggleGroupDefault type='single' mode={'pill'} size='lg' />,
          },
        },
      ]}
    />
  ),
}
