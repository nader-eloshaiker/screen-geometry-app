import { Alert, AlertDescription, AlertTitle } from '@lib/components/alert'
import type { Meta, StoryObj } from '@storybook/react'
import { AlertCircle, Terminal } from 'lucide-react'

const meta = {
  title: 'elements/Alert',
  component: Alert,
  // tags: ['autodocs'],
  args: {},
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Component: Story = {
  args: {},
  render: () => (
    <Alert>
      <Terminal className='size-4' />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>You can add components and dependencies to your app using the cli.</AlertDescription>
    </Alert>
  ),
  parameters: {},
}

export const Danger: Story = {
  args: {},
  render: () => (
    <Alert palette='danger'>
      <AlertCircle className='size-4' />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
    </Alert>
  ),
  parameters: {},
}
