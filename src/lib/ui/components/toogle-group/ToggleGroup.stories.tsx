import { ToggleGroupSingleProps } from '@radix-ui/react-toggle-group'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import type { VariantProps } from 'class-variance-authority'
import { StateTable } from '../../storybook/StateTable'
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup'
import { TToggleMode, TTogglePalette, TToggleSize, ToggleVariants } from './ToggleVariants'

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
    <StateTable<'single' | 'multiple'>
      caption='Selection Mode'
      defaultProps='single'
      states={['normal', 'disabled']}
      props={['single', 'multiple']}
      getComponent={(prop, state) => (
        <ToggleGroupDefault
          type={prop}
          defaultValue={prop === 'single' ? 'bold' : ['bold', 'underline']}
          disabled={state === 'disabled'}
        />
      )}
    />
  ),
}

export const Palette: Story = {
  args: {},
  render: () => (
    <StateTable<TTogglePalette>
      caption='Toggle Group Palette'
      defaultProps='primary'
      props={['primary', 'secondary', 'neutral']}
      getComponent={(prop, state) => (
        <ToggleGroupDefault
          type='multiple'
          palette={prop}
          idRef={state}
          disabled={state === 'disabled'}
          defaultValue={state === 'active' ? 'underline' : undefined}
        />
      )}
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
    <StateTable<TToggleMode>
      caption='Toggle Group Modes'
      defaultProps='button'
      props={['button', 'outline', 'pill']}
      getComponent={(prop, state) => (
        <ToggleGroupDefault
          type='multiple'
          mode={prop}
          idRef={state}
          disabled={state === 'disabled'}
          defaultValue={state === 'active' ? 'underline' : undefined}
        />
      )}
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
    <StateTable<TToggleSize>
      caption=' Sizes'
      defaultProps='md'
      props={['sm', 'md', 'lg']}
      getComponent={(prop, state) => (
        <ToggleGroupDefault
          type='multiple'
          dimension={prop}
          idRef={state}
          disabled={state === 'disabled'}
          defaultValue={state === 'active' ? 'underline' : undefined}
        />
      )}
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
