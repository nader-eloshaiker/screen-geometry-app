import type { Meta, StoryFn, StoryObj } from '@storybook/react'
import { useEffect } from 'react'
import {
  NotificationActionTypes,
  NotificationItem,
  NotificationProvider,
  NotificationToaster,
  NotificationType,
  useNotificationContext,
} from '.'

const NotificationToasterDecorator = (Story: StoryFn) => (
  <NotificationProvider>
    <Story />
  </NotificationProvider>
)

type StoryProps = { notification: NotificationItem }
const NotificationToasterStory = ({ notification }: StoryProps) => {
  const { state, dispatch } = useNotificationContext()

  useEffect(() => {
    if (state.notifications.length === 0) {
      setTimeout(() => {
        dispatch({ type: NotificationActionTypes.ADD_NOTIFICATION, payload: notification })
      }, 1000)
    }
  }, [dispatch, notification, state.notifications.length])

  return (
    <div className='h-48 w-56'>
      <NotificationToaster />
    </div>
  )
}

const meta = {
  title: 'components/NotificationToaster',
  component: NotificationToasterStory,
  decorators: [NotificationToasterDecorator],
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Notification toaster for displaying messages to the user.',
      },
    },
  },
  argTypes: {
    notification: {
      description: 'Notification to be displayed.',
      table: { category: 'content', type: { summary: 'NotificationItem' } },
      control: { type: 'object', required: true },
    },
  },
} satisfies Meta<typeof NotificationToasterStory>

export default meta
type Story = StoryObj<typeof meta>

export const SuccessNotification: Story = {
  args: {
    notification: {
      value: { title: 'Success', message: 'This is an Success notification' },
      type: NotificationType.SUCCESS,
    },
  },
}
export const WarningNotification: Story = {
  args: {
    notification: {
      value: { title: 'Warning', message: 'This is a Warning notification' },
      type: NotificationType.WARNING,
    },
  },
}
export const ErrorNotification: Story = {
  args: {
    notification: {
      value: { title: 'Error', message: 'This is an Error notification' },
      type: NotificationType.ERROR,
    },
  },
}
