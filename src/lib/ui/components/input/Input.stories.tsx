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

export const Default: Story = {
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

const palettes: Array<TInputVariantsPalette> = ['primary', 'secondary', 'neutral', 'danger']

export const Palette: Story = {
  args: {},
  render: () => (
    <StateTable<TInputVariantsPalette>
      caption='Palettes'
      defaultProps='primary'
      props={palettes}
      states={['normal', 'hover', 'focus', 'disabled']}
      getComponent={(prop, state) => (
        <Label palette={prop} className='grid w-full max-w-sm items-center gap-2.5'>
          <div>Email</div>
          <Input
            type='email'
            id={`${state}-${prop}`}
            palette={prop}
            disabled={state === 'disabled'}
            placeholder='Email'
          />
        </Label>
      )}
      getRowClassName={(prop) => (prop === 'secondary' ? 'bg-card text-card-foreground' : '')}
    />
  ),
  parameters: {
    pseudo: {
      hover: palettes.map((palette) => `#hover-${palette}`), //['#hover'],
      active: palettes.map((palette) => `#active-${palette}`), //['#active'],
      focusVisible: palettes.map((palette) => `#focus-${palette}`), //['#focus'],
    },
  },
}
