import { NotificationActionTypes, NotificationItem, NotificationType } from '@contexts/Notification/NotificationManager'
import { NotificationProvider } from '@contexts/Notification/NotificationProvider'
import { useNotificationContext } from '@contexts/Notification/useNotifcationContext'
import type { Meta, StoryFn, StoryObj } from '@storybook/react'
import { useEffect } from 'react'
import { NotificationToaster } from './NotificationToaster'

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
    <div className='h-56 w-full'>
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
      // story: {
      //   inline: false,
      //   iframeHeight: 300,
      // },
    },
  },
  argTypes: {
    notification: {
      description: 'Notification to be displayed.',
      table: { category: 'content', type: { summary: 'NotificationItem' } },
      control: 'object',
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
      value: { title: 'Warning', message: 'This is a Warniong notification' },
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
