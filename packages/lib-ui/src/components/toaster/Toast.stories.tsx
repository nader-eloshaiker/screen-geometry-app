import type { Meta, StoryObj } from '@storybook/react-vite'
import { type VariantProps } from 'class-variance-authority'
import { useEffect } from 'react'
import { Toast, ToastAction, type ToastActionElement } from './Toast'
import { ToastVariants } from './Toast.variants'
import { Toaster } from './Toaster'
import { useToast } from './useToast'

type PaletteType = VariantProps<typeof ToastVariants>['palette']
type ToastProps = {
  action?: ToastActionElement
  description?: string
  duration?: number
  palette?: PaletteType
  title?: string
}

const meta = {
  // tags: ['autodocs'],
  argTypes: {},
  component: Toast,
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
  title: 'Elements/Toast',
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = {
  args: {
    action: (
      <ToastAction palette='info' altText='Try again'>
        Cool
      </ToastAction>
    ),
    description: 'This is a toaster.',
    palette: 'info',
    title: 'Toaster!',
  } as ToastProps,
  parameters: {},
}

export const Danger: Story = {
  args: {
    action: (
      <ToastAction palette='danger' altText='Try again'>
        Try again
      </ToastAction>
    ),
    description: 'There was a problem with your request.',
    palette: 'danger',
    title: 'Operation Failed!',
  } as ToastProps,
  parameters: {},
}

export const Waning: Story = {
  args: {
    action: (
      <ToastAction palette='warning' altText='Try again'>
        OK
      </ToastAction>
    ),
    description: 'Could not find your account.',
    palette: 'warning',
    title: 'Something missing!',
  } as ToastProps,
  parameters: {},
}

export const Success: Story = {
  args: {
    action: (
      <ToastAction palette='success' altText='Try again'>
        Done
      </ToastAction>
    ),
    description: 'Request was completed successfully.',
    palette: 'success',
    title: 'Complete!',
  } as ToastProps,
  parameters: {},
}
