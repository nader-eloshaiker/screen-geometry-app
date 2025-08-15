import { StateTable } from '@/storybook/StateTable'
import type { ToggleGroupSingleProps } from '@radix-ui/react-toggle-group'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { VariantProps } from 'class-variance-authority'
import { fn } from 'storybook/test'
import type { ToggleVariants, TToggleMode, TTogglePalette, TToggleSize } from '../toggle'
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup'

type ToggleGroupDefaultProps = { type: 'multiple' | 'single' } & VariantProps<typeof ToggleVariants> &
  Record<string, unknown>

const ToggleGroupDefault = ({ idRef, type, ...variants }: ToggleGroupDefaultProps) => {
  return (
    <ToggleGroup type={type as ToggleGroupSingleProps['type']} {...variants}>
      <ToggleGroupItem value='bold' aria-label='Toggle bold' id={`${idRef}-bold`}>
        <div className='w-2 font-bold'>B</div>
      </ToggleGroupItem>
      <ToggleGroupItem value='italic' aria-label='Toggle italic' id={`${idRef}-italic`}>
        <div className='w-2 italic'>I</div>
      </ToggleGroupItem>
      <ToggleGroupItem value='underline' aria-label='Toggle underline' id={`${idRef}-underline`}>
        <div className='w-2 underline underline-offset-2'>U</div>
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

const meta = {
  // tags: ['autodocs'],
  args: { onClick: fn(), onFocus: fn(), onMouseEnter: fn(), onMouseLeave: fn(), type: 'single' },
  argTypes: {},
  component: ToggleGroup,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  title: 'Elements/ToggleGroup',
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
  parameters: {
    pseudo: {
      active: ['#active-underline'],
      focusVisible: ['#focus-underline'],
      hover: ['#hover-underline'],
    },
  },
  render: () => (
    <StateTable<TTogglePalette>
      caption='Palettes'
      defaultProps='primary'
      props={['primary', 'secondary', 'mono']}
      states={['normal', 'hover', 'focus', 'active', 'disabled']}
      getComponent={(prop, state) => (
        <ToggleGroupDefault
          type='multiple'
          palette={prop}
          idRef={state}
          disabled={state === 'disabled'}
          defaultValue={state === 'active' ? 'underline' : undefined}
        />
      )}
      getRowClassName={(prop) => (prop === 'secondary' ? 'bg-card text-card-foreground' : '')}
    />
  ),
}

export const Mode: Story = {
  args: {},
  parameters: {
    pseudo: {
      active: ['#active-underline'],
      focusVisible: ['#focus-underline'],
      hover: ['#hover-underline'],
    },
  },
  render: () => (
    <StateTable<TToggleMode>
      caption='Modes'
      defaultProps='ghost'
      props={['ghost', 'outline', 'pill']}
      states={['normal', 'hover', 'focus', 'active', 'disabled']}
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
}

export const Dimension: Story = {
  args: {},
  parameters: {
    pseudo: {
      active: ['#active-underline'],
      focusVisible: ['#focus-underline'],
      hover: ['#hover-underline'],
    },
  },
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
}
