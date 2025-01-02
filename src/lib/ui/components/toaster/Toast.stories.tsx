import type { Meta, StoryObj } from '@storybook/react'
import { VariantProps } from 'class-variance-authority'
import { useEffect } from 'react'
import { Toast, ToastAction, ToastActionElement } from './Toast'
import { ToastVariants } from './Toast.variants'
import { Toaster } from './Toaster'
import { useToast } from './useToast'

type PaletteType = VariantProps<typeof ToastVariants>['palette']
type ToastProps = {
  title?: string
  description?: string
  action?: ToastActionElement
  palette?: PaletteType
  duration?: number
}

const meta = {
  title: 'Elements/Toast',
  component: Toast,
  // tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (_, { args }) => {
      const { toast } = useToast()

      useEffect(() => {
        setTimeout(() => {
          toast({ ...args })
        })
        const refreshIntervalId = setInterval(() => {
          toast({ ...args })
        }, 3000)

        return () => clearInterval(refreshIntervalId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

      return <Toaster />
    },
  ],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = {
  args: {
    palette: 'info',
    title: 'Toaster!',
    description: 'This is a toaster.',
    action: (
      <ToastAction palette='info' altText='Try again'>
        Cool
      </ToastAction>
    ),
  } as ToastProps,
  parameters: {},
}

export const Danger: Story = {
  args: {
    palette: 'danger',
    title: 'Operation Failed!',
    description: 'There was a problem with your request.',
    action: (
      <ToastAction palette='danger' altText='Try again'>
        Try again
      </ToastAction>
    ),
  } as ToastProps,
  parameters: {},
}

export const Waning: Story = {
  args: {
    palette: 'warning',
    title: 'Something missing!',
    description: 'Could not find your account.',
    action: (
      <ToastAction palette='warning' altText='Try again'>
        OK
      </ToastAction>
    ),
  } as ToastProps,
  parameters: {},
}

export const Success: Story = {
  args: {
    palette: 'success',
    title: 'Complete!',
    description: 'Request was completed successfully.',
    action: (
      <ToastAction palette='success' altText='Try again'>
        Done
      </ToastAction>
    ),
  } as ToastProps,
  parameters: {},
}
