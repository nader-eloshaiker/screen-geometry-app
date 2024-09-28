import { AxiosError } from 'axios'
import { describe, expect, it } from 'vitest'
import {
  NotificationEvent,
  NotificationEventTypes,
  NotificationState,
  NotificationType,
  initialNotificationState,
  notificationReducer,
} from './NotificationManager'

let ulidCounter = 0

vi.mock('ulid', () => ({
  ulid: () => (ulidCounter++).toString(),
}))

describe('notificationReducer', () => {
  beforeEach(() => {
    ulidCounter = 0
  })

  it('should handle ADD_NOTIFICATION event', () => {
    const event: NotificationEvent = {
      type: NotificationEventTypes.ADD_NOTIFICATION,
      payload: { value: { title: 'Test title', message: 'Test message' }, type: NotificationType.ERROR },
    }
    const result = notificationReducer(initialNotificationState, event)

    const expectedState = {
      notifications: [
        {
          tag: '0',
          type: 'alert-error',
          value: {
            message: 'Test message',
            title: 'Test title',
          },
        },
      ],
    }
    expect(result).toEqual(expectedState)
  })

  it('should handle ADD_NOTIFICATION event with non-cancelled axios error', () => {
    const event: NotificationEvent = {
      type: NotificationEventTypes.ADD_NOTIFICATION,
      payload: { value: new Error('Test error'), type: NotificationType.ERROR },
    }
    const result = notificationReducer(initialNotificationState, event)

    const expectedState = {
      notifications: [
        {
          tag: '0',
          type: 'alert-error',
          value: expect.objectContaining({ message: 'Test error' }),
        },
      ],
    }
    expect(result).toEqual(expectedState)
  })

  it('should handle ADD_NOTIFICATION event with cancelled axios error', () => {
    const event: NotificationEvent = {
      type: NotificationEventTypes.ADD_NOTIFICATION,
      payload: { value: new AxiosError('Test error'), type: NotificationType.ERROR },
    }
    const result = notificationReducer(initialNotificationState, event)

    const expectedState = {
      notifications: [
        {
          tag: '0',
          type: 'alert-error',
          value: expect.objectContaining({ message: 'Test error' }),
        },
      ],
    }
    expect(result).toEqual(expectedState)
  })

  it('should handle REMOVE_NOTIFICATION event', () => {
    const state: NotificationState = {
      notifications: [
        { tag: 'tag1', value: { title: 'Test title', message: 'Test message' }, type: NotificationType.ERROR },
        { tag: 'tag2', value: { title: 'Test title', message: 'Test message' }, type: NotificationType.ERROR },
      ],
    }
    const event: NotificationEvent = { type: NotificationEventTypes.REMOVE_NOTIFICATION, payload: 'tag1' }
    const expectedState = {
      notifications: [
        {
          tag: 'tag2',
          value: {
            message: 'Test message',
            title: 'Test title',
          },
          type: 'alert-error',
        },
      ],
    }
    const result = notificationReducer(state, event)
    expect(result).toEqual(expectedState)
  })

  it('should handle REMOVE_NOTIFICATION event with non-existent tag', () => {
    const state: NotificationState = {
      notifications: [
        { tag: 'tag1', value: { title: 'Test title', message: 'Test message' }, type: NotificationType.ERROR },
        { tag: 'tag2', value: { title: 'Test title', message: 'Test message' }, type: NotificationType.ERROR },
      ],
    }
    const event: NotificationEvent = { type: NotificationEventTypes.REMOVE_NOTIFICATION, payload: 'non-existent-tag' }
    const expectedState = state
    const result = notificationReducer(state, event)
    expect(result).toEqual(expectedState)
  })
})
