import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Label } from '../../label/Label'
import { StateTable } from '../../storybook/StateTable'
import { Input } from './Input'
import { TInputVariantsPalette } from './inputVariants'

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
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='email'>Email</Label>
          <Story />
        </div>
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
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor={`${state}-${prop}`}>Email</Label>
          <Input
            type='email'
            id={`${state}-${prop}`}
            palette={prop}
            disabled={state === 'disabled'}
            placeholder='Email'
          />
        </div>
      )}
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
