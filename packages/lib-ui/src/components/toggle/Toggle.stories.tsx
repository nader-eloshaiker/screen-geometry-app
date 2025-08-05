import { StateTable } from '@/storybook/StateTable'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Italic } from 'lucide-react'
import { fn } from 'storybook/test'
import { Toggle } from './Toggle'
import { TToggleMode, TTogglePalette, TToggleSize } from './Toggle.variants'

const meta = {
  title: 'Elements/Toggle',
  // tags: ['autodocs'],
  args: { onClick: fn(), onMouseEnter: fn(), onMouseLeave: fn(), onFocus: fn(), type: 'single' },
  argTypes: {},
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Palette: Story = {
  args: {},
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
  parameters: {
    pseudo: {
      hover: ['#hover'],
      active: ['#active'],
      focusVisible: ['#focus'],
    },
  },
}

export const Dimension: Story = {
  args: {},
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
  parameters: {
    pseudo: {
      hover: ['#hover-underline'],
      active: ['#active-underline'],
      focusVisible: ['#focus-underline'],
    },
  },
}
