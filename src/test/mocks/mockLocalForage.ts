import { ScreenItem } from '@openapi/generated/models'
import localforage from 'localforage'

export const spyOnLocalForage = (initial?: Array<ScreenItem>) => {
  const store: Array<ScreenItem> = initial ?? []
  vi.spyOn(localforage, 'getItem').mockImplementation((_) => {
    return Promise.resolve(store)
  })
  vi.spyOn(localforage, 'setItem').mockImplementation((_, list: unknown) => {
    store.splice(0, store.length, ...(list as Array<ScreenItem>))

    return Promise.resolve(store)
  })
  vi.spyOn(localforage, 'clear').mockImplementation(() => {
    store.splice(0, store.length)

    return Promise.resolve()
  })
  vi.spyOn(localforage, 'length').mockImplementation(() => {
    return Promise.resolve(store.length)
  })

  return store
}
