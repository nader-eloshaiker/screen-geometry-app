import { StateTable } from '@/storybook/StateTable'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Label } from '../label'
import { Input } from './Input'
import type { TInputVariantsPalette } from './InputVariants'

const meta = {
  // tags: ['autodocs'],
  args: { onBlur: fn(), onClick: fn(), onFocus: fn() },
  component: Input,
  parameters: {
    layout: 'centered',
  },
  title: 'elements/Input',
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Component: Story = {
  args: {
    id: 'email',
    onBlur: fn(),
    onClick: fn(),
    placeholder: 'Email',
    type: 'email',
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
  parameters: {
    pseudo: {
      active: ['#active'],
      focusVisible: ['#focus'],
      hover: ['#hover'],
    },
  },
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
      getRowClassName={(prop) => (prop === 'secondary' ? 'bg-primary text-primary-foreground' : '')}
    />
  ),
}

export const AdornmentStart: Story = {
  args: {},
  parameters: {
    pseudo: {
      active: ['#active'],
      focusVisible: ['#focus'],
      hover: ['#hover'],
    },
  },
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
      getRowClassName={(prop) => (prop === 'secondary' ? 'bg-primary text-primary-foreground' : '')}
    />
  ),
}

export const AdornmentEnd: Story = {
  args: {},
  parameters: {
    pseudo: {
      active: ['#active'],
      focusVisible: ['#focus'],
      hover: ['#hover'],
    },
  },
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
      getRowClassName={(prop) => (prop === 'secondary' ? 'bg-primary text-primary-foreground' : '')}
    />
  ),
}
