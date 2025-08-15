import { StateTable } from '@/storybook/StateTable'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Italic } from 'lucide-react'
import { fn } from 'storybook/test'
import { Toggle } from './Toggle'
import type { TToggleMode, TTogglePalette, TToggleSize } from './Toggle.variants'

const meta = {
  // tags: ['autodocs'],
  args: { onClick: fn(), onFocus: fn(), onMouseEnter: fn(), onMouseLeave: fn(), type: 'single' },
  argTypes: {},
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  title: 'Elements/Toggle',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Palette: Story = {
  args: {},
  parameters: {
    pseudo: {
      active: ['#active'],
      focusVisible: ['#focus'],
      hover: ['#hover'],
    },
  },
  render: () => (
    <StateTable<TTogglePalette>
      caption='Palettes'
      defaultProps='primary'
      props={['primary', 'secondary', 'mono']}
      states={['normal', 'hover', 'focus', 'active', 'disabled']}
      getComponent={(prop, state) => (
        <Toggle
          palette={prop}
          id={state}
          disabled={state === 'disabled'}
          {...(state === 'active' && { 'data-state': 'on' })}
        >
          <Italic />
          Italic
        </Toggle>
      )}
      getRowClassName={(prop) => (prop === 'secondary' ? 'bg-card text-card-foreground' : '')}
    />
  ),
}

export const Mode: Story = {
  args: {},
  parameters: {
    pseudo: {
      active: ['#active'],
      focusVisible: ['#focus'],
      hover: ['#hover'],
    },
  },
  render: () => (
    <StateTable<TToggleMode>
      caption='Modes'
      defaultProps='ghost'
      props={['ghost', 'outline', 'pill']}
      states={['normal', 'hover', 'focus', 'active', 'disabled']}
      getComponent={(prop, state) => (
        <Toggle mode={prop} id={state} disabled={state === 'disabled'}>
          <Italic />
          Italic
        </Toggle>
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
        <Toggle dimension={prop} id={state} disabled={state === 'disabled'}>
          <Italic />
          Italic
        </Toggle>
      )}
    />
  ),
}
