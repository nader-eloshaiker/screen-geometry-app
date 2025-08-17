import type { Meta, StoryObj } from '@storybook/react-vite'
import { AlertCircle, Terminal } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from './Alert'

const meta = {
  // tags: ['autodocs'],
  args: {},
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  title: 'elements/Alert',
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Component: Story = {
  args: {},
  parameters: {},
  render: () => (
    <Alert>
      <Terminal className='size-4' />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>You can add components and dependencies to your app using the cli.</AlertDescription>
    </Alert>
  ),
}

export const Primary: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div id='alert-constainer' className='grid w-full max-w-xl items-start gap-4'>
        <Story />
      </div>
    ),
  ],
  parameters: {},
  render: () => (
    <Alert palette='primary'>
      <AlertCircle className='size-4' />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
    </Alert>
  ),
}

export const Secondary: Story = {
  args: {},
  parameters: {},
  render: () => (
    <Alert palette='secondary'>
      <AlertCircle className='size-4' />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
    </Alert>
  ),
}

export const Danger: Story = {
  args: {},
  parameters: {},
  render: () => (
    <Alert palette='danger'>
      <AlertCircle className='size-4' />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
    </Alert>
  ),
}

export const Success: Story = {
  args: {},
  parameters: {},
  render: () => (
    <Alert palette='success'>
      <AlertCircle className='size-4' />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
    </Alert>
  ),
}

export const Warning: Story = {
  args: {},
  parameters: {},
  render: () => (
    <Alert palette='warning'>
      <AlertCircle className='size-4' />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
    </Alert>
  ),
}

export const Info: Story = {
  args: {},
  parameters: {},
  render: () => (
    <Alert palette='info'>
      <AlertCircle className='size-4' />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
    </Alert>
  ),
}
