import {
  GeneralNotificationItem,
  NotificationActionTypes,
  NotificationItem,
  NotificationType,
} from '@contexts/Notification/NotificationManager'
import { NotificationProvider } from '@contexts/Notification/NotificationProvider'
import { useNotificationContext } from '@contexts/Notification/useNotifcationContext'
import { ErrorResponse } from '@openapi/generated/models'
import { fireEvent, render } from '@testing-library/react'
import { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { useEffect } from 'react'
import { act } from 'react-dom/test-utils'
import { NotificationToaster } from './NotificationToaster'

const TestComponent = ({ payload }: { payload: NotificationItem }) => {
  const { state, dispatch } = useNotificationContext()

  useEffect(() => {
    dispatch({ type: NotificationActionTypes.ADD_NOTIFICATION, payload })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <NotificationToaster />,
      <ul>
        {state.notifications.map((notification) => (
          <li key={notification.tag}>{JSON.stringify(notification)}</li>
        ))}
      </ul>
    </>
  )
}

describe('#NotificationToaster', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should render the success notification', () => {
    const successNotification: NotificationItem = {
      value: { title: 'aaa', message: 'bbb' } as GeneralNotificationItem,
      type: NotificationType.SUCCESS,
    }
    const { getByText, container } = render(
      <NotificationProvider>
        <TestComponent payload={successNotification} />
      </NotificationProvider>,
    )

    const element = getByText('aaa')

    expect(element).toBeInTheDocument()
    expect(container.querySelectorAll('li')).toHaveLength(1)

    act(() => {
      vi.advanceTimersByTime(3500)
    })

    expect(element).not.toBeInTheDocument()
    expect(container.querySelectorAll('li')).toHaveLength(0)
  })

  it('should render the error GeneralNotification', () => {
    const errorNotification: NotificationItem = {
      value: { title: 'aaa', message: 'bbb' } as GeneralNotificationItem,
      type: NotificationType.ERROR,
    }
    const { getByText, container } = render(
      <NotificationProvider>
        <TestComponent payload={errorNotification} />
      </NotificationProvider>,
    )
    const element = getByText('DISMISS')

    expect(element).toBeInTheDocument()
    expect(container.querySelectorAll('li')).toHaveLength(1)

    act(() => {
      vi.advanceTimersByTime(3500)
    })

    expect(element).toBeInTheDocument()
    expect(container.querySelectorAll('li')).toHaveLength(1)

    act(() => {
      fireEvent.click(element)
    })

    expect(element).not.toBeInTheDocument()
    expect(container.querySelectorAll('li')).toHaveLength(0)
  })

  it('should render the error ErrorResponse', () => {
    const errorNotification: NotificationItem = {
      value: { error: { code: 401, message: 'No Acess', status: 'Unauthorized' } } as ErrorResponse,
      type: NotificationType.ERROR,
    }
    const { getByText, container } = render(
      <NotificationProvider>
        <TestComponent payload={errorNotification} />
      </NotificationProvider>,
    )
    const element = getByText('DISMISS')

    expect(element).toBeInTheDocument()
    expect(container.querySelectorAll('li')).toHaveLength(1)

    act(() => {
      vi.advanceTimersByTime(3500)
    })

    expect(element).toBeInTheDocument()
    expect(container.querySelectorAll('li')).toHaveLength(1)

    act(() => {
      fireEvent.click(element)
    })

    expect(element).not.toBeInTheDocument()
    expect(container.querySelectorAll('li')).toHaveLength(0)
  })

  it('should render the error AxiosError', () => {
    const errorNotification: NotificationItem = {
      value: new AxiosError(
        'Unauthorized',
        '401',
        {} as InternalAxiosRequestConfig,
        {},
        {
          data: { errors: [{ detail: 'a' }] },
          status: 401,
          statusText: 'Unauthorized',
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        },
      ),
      type: NotificationType.ERROR,
    }
    const { getByText, container } = render(
      <NotificationProvider>
        <TestComponent payload={errorNotification} />
      </NotificationProvider>,
    )
    const element = getByText('DISMISS')

    expect(element).toBeInTheDocument()
    expect(container.querySelectorAll('li')).toHaveLength(1)

    act(() => {
      vi.advanceTimersByTime(3500)
    })

    expect(element).toBeInTheDocument()
    expect(container.querySelectorAll('li')).toHaveLength(1)

    act(() => {
      fireEvent.click(element)
    })

    expect(element).not.toBeInTheDocument()
    expect(container.querySelectorAll('li')).toHaveLength(0)
  })

  it('should render the error Unknown', () => {
    const errorNotification: NotificationItem = {
      value: { unkown: 'unkown' },
      type: NotificationType.ERROR,
    }
    const { getByText, container } = render(
      <NotificationProvider>
        <TestComponent payload={errorNotification} />
      </NotificationProvider>,
    )
    const element = getByText('DISMISS')

    expect(element).toBeInTheDocument()
    expect(container.querySelectorAll('li')).toHaveLength(1)

    act(() => {
      vi.advanceTimersByTime(3500)
    })

    expect(element).toBeInTheDocument()
    expect(container.querySelectorAll('li')).toHaveLength(1)

    act(() => {
      fireEvent.click(element)
    })

    expect(element).not.toBeInTheDocument()
    expect(container.querySelectorAll('li')).toHaveLength(0)
  })

  it('should render the Warning', () => {
    const warningNotification: NotificationItem = {
      value: { title: 'aaa', message: 'bbb' } as GeneralNotificationItem,
      type: NotificationType.WARNING,
    }
    const { getByText, container } = render(
      <NotificationProvider>
        <TestComponent payload={warningNotification} />
      </NotificationProvider>,
    )
    const element = getByText('aaa')

    expect(element).toBeInTheDocument()
    expect(container.querySelectorAll('li')).toHaveLength(1)

    act(() => {
      vi.advanceTimersByTime(3500)
    })

    expect(element).not.toBeInTheDocument()
    expect(container.querySelectorAll('li')).toHaveLength(0)
  })
})
