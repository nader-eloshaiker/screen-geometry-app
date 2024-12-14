import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { StateTable } from '../../storybook/StateTable'
import { Label } from '../label/Label'
import { Input } from './Input'
import { TInputVariantsPalette } from './InputVariants'

const meta = {
  title: 'elements/Input',
  component: Input,
  // tags: ['autodocs'],
  args: { onClick: fn(), onFocus: fn(), onBlur: fn() },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Component: Story = {
  args: {
    type: 'email',
    id: 'email',
    placeholder: 'Email',
    onClick: fn(),
    onBlur: fn(),
  },
  decorators: [
    (Story) => {
      return (
        <Label className='grid w-full max-w-sm items-center gap-1.5'>
          <div>Email</div>
          <Story id='email' />
        </Label>
      )
    },
  ],
}

const palettes: Array<TInputVariantsPalette> = ['primary', 'secondary', 'mono', 'danger', 'success', 'warning']

export const Palette: Story = {
  args: {},
  render: () => (
    <StateTable<TInputVariantsPalette>
      caption='Palettes'
      defaultProps='primary'
      props={palettes}
      states={['normal', 'hover', 'focus', 'disabled']}
      getComponent={(prop, state) => (
        <Label palette={prop} className='grid w-full max-w-sm items-center gap-3'>
          <div>Email</div>
          <Input type='email' id={state} palette={prop} disabled={state === 'disabled'} placeholder='Email' />
        </Label>
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

export const AdornmentStart: Story = {
  args: {},
  render: () => (
    <StateTable<TInputVariantsPalette>
      caption='Palettes'
      defaultProps='primary'
      props={palettes}
      states={['normal', 'hover', 'focus', 'disabled']}
      getComponent={(prop, state) => (
        <Label palette={prop} className='grid w-full max-w-sm items-center gap-3'>
          <div>Email</div>
          <Input
            type='email'
            id={state}
            className='pl-12'
            palette={prop}
            disabled={state === 'disabled'}
            placeholder='Email'
            startAdornment={<div>😀</div>}
          />
        </Label>
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

export const AdornmentEnd: Story = {
  args: {},
  render: () => (
    <StateTable<TInputVariantsPalette>
      caption='Palettes'
      defaultProps='primary'
      props={palettes}
      states={['normal', 'hover', 'focus', 'disabled']}
      getComponent={(prop, state) => (
        <Label palette={prop} className='grid w-full max-w-sm items-center gap-3'>
          <div>Email</div>
          <Input
            type='email'
            id={state}
            className='pr-12'
            palette={prop}
            disabled={state === 'disabled'}
            placeholder='Email'
            endAdornment='px'
          />
        </Label>
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
