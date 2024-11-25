import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Label } from '../label/Label'
import { Input } from './Input'

const meta = {
  title: 'elements/Input',
  component: Input,
  decorators: [],
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    actions: {
      handles: ['change input', 'select item'],
    },
    docs: {
      description: {
        story: 'InputField with dropdown list',
      },
    },
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
