import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Checkbox } from './Checkbox'

const meta = {
  title: 'Elements/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='flex space-x-2'>
        <Story />
        <div className='grid gap-1.5 leading-none'>
          <label
            htmlFor='terms1'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Accept terms and conditions
          </label>
          <p className='text-sm text-muted-foreground'>You agree to our Terms of Service and Privacy Policy.</p>
        </div>
      </div>
    ),
  ],
  argTypes: {},
  args: { id: 'terms1', onClick: fn(), onFocus: fn() },
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  parameters: {},
}
