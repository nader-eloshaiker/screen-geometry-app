import { Navbar } from '@lib/components/navbar'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Elements/Navbar',
  component: Navbar,
  // tags: ['autodocs'],
  argTypes: {},
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof Navbar>

export default meta
type Story = StoryObj<typeof meta>

export const Component: Story = {
  args: {},
  parameters: {},
  decorators: [],
}
