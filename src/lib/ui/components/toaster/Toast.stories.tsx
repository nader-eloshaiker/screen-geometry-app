import type { Meta, StoryObj } from '@storybook/react'
import { VariantProps } from 'class-variance-authority'
import { Button } from '../button/Button'
import { Toast, ToastAction, ToastActionElement } from './Toast'
import { ToastVariants } from './ToastVariants'
import { Toaster } from './Toaster'
import { useToast } from './useToast'

type IntentType = VariantProps<typeof ToastVariants>['intent']
type ToastProps = {
  title?: string | undefined
  description?: string | undefined
  action?: ToastActionElement
  intent?: IntentType
  duration?: number
}

const Body = ({ title, description, action, intent, children }: Readonly<ToastProps & TReactChildren>) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>
              <h1>Toast</h1>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='p-2 text-end font-bold'>variant:</td>
            <td className='p-2'>{intent}</td>
          </tr>
          <tr>
            <td className='p-2 text-end font-bold'>title:</td>
            <td className='p-2'>{title}</td>
          </tr>
          <tr>
            <td className='p-2 text-end font-bold'>description:</td>
            <td className='p-2'>{description}</td>
          </tr>
          <tr>
            <td className='p-2 text-end font-bold'>action:</td>
            <td className='p-2'>{action}</td>
          </tr>
          <tr>
            <td className='p-2' colSpan={2}>
              {children}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const meta = {
  title: 'Elements/Toast',
  component: Toast,
  // args: {
  //   variant: 'default',
  //   title: 'Toaster!',
  //   description: 'This is a toaster.',
  //   duration: 3000,
  //   action: (
  //     <ToastAction variant='default' altText='Try again'>
  //       Cool
  //     </ToastAction>
  //   ),
  // } as ToastProps,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (Story) => (
      <div>
        <Story />
        <Toaster />
      </div>
    ),
  ],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    intent: 'default',
    title: 'Toaster!',
    description: 'This is a toaster.',
    duration: 3000,
    action: (
      <ToastAction variant='default' altText='Try again'>
        Cool
      </ToastAction>
    ),
  } as ToastProps,
  decorators: [
    (_, { args }) => {
      const { toast } = useToast()
      return (
        <Body {...args}>
          <Button onClick={() => toast({ ...args })}>Show Toast</Button>
          <Toaster />
        </Body>
      )
    },
  ],
  parameters: {},
}

export const Destructive: Story = {
  args: {
    intent: 'destructive',
    title: 'Operation Failed!',
    description: 'There was a problem with your request.',
    action: (
      <ToastAction variant='destructive' altText='Try again'>
        Try again
      </ToastAction>
    ),
  } as ToastProps,
  decorators: [
    (_, { args }) => {
      const { toast } = useToast()
      return (
        <Body {...args}>
          <Button onClick={() => toast({ ...args })}>Show Toast</Button>
          <Toaster />
        </Body>
      )
    },
  ],
  parameters: {},
}

export const Waning: Story = {
  args: {
    intent: 'warning',
    title: 'Something missing!',
    description: 'Could not find your account.',
    action: (
      <ToastAction variant='default' altText='Try again'>
        OK
      </ToastAction>
    ),
  } as ToastProps,
  decorators: [
    (_, { args }) => {
      const { toast } = useToast()
      return (
        <Body {...args}>
          <Button onClick={() => toast({ ...args })}>Show Toast</Button>
          <Toaster />
        </Body>
      )
    },
  ],
  parameters: {},
}

export const Success: Story = {
  args: {
    intent: 'success',
    title: 'Complete!',
    description: 'Request was completed successfully.',
    action: (
      <ToastAction variant='default' altText='Try again'>
        Done
      </ToastAction>
    ),
  } as ToastProps,
  decorators: [
    (_, { args }) => {
      const { toast } = useToast()
      return (
        <Body {...args}>
          <Button onClick={() => toast({ ...args })}>Show Toast</Button>
          <Toaster />
        </Body>
      )
    },
  ],
  parameters: {},
}

export const Info: Story = {
  args: {
    intent: 'info',
    title: 'Info!',
    description: 'There will be an aoutage int he comming days.',
    action: (
      <ToastAction variant='default' altText='Try again'>
        OK
      </ToastAction>
    ),
  } as ToastProps,
  decorators: [
    (_, { args }) => {
      const { toast } = useToast()
      return (
        <Body {...args}>
          <Button onClick={() => toast({ ...args })}>Show Toast</Button>
          <Toaster />
        </Body>
      )
    },
  ],
  parameters: {},
}
