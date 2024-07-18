export const localStorageMock = () => {
  let storage: { [key: string]: string } = {}
  let debug = false

  const localStorageMock = {
    getItem: vi.fn().mockImplementation((key: string): string | null => {
      if (debug) {
        localStorageMock.log(`get ${key}}`)
      }
      return storage[key] || null
    }),
    setItem: vi.fn((key: string, value: string): void => {
      storage[key] = value
      if (debug) {
        localStorageMock.log(`set ${key} to ${value}`)
      }
    }),
    removeItem: vi.fn((key: string): void => {
      delete storage[key]
      if (debug) {
        localStorageMock.log(`remove ${key}`)
      }
    }),
    clear: vi.fn((): void => {
      storage = {} as { [key: string]: string }
      if (debug) {
        localStorageMock.log('clear')
      }
    }),
    length: Object.keys(storage).length,
    get: vi.fn((key: string) => storage[key]),
    key: vi.fn((index: number) => Object.keys(storage)[index]),

    // custom methods
    reset: () => {
      localStorageMock.getItem.mockClear()
      localStorageMock.setItem.mockClear()
      localStorageMock.removeItem.mockClear()
      localStorageMock.clear.mockClear()
      localStorageMock.clear()
    },

    log: (action?: string) => {
      console.log(`### localStorage${action ? ` ${action}` : ''}`, JSON.stringify(storage, null, 2))
    },

    debug: (value: boolean) => {
      console.log(`### localStorage debug: ${value}`)
      debug = value
    },
  }

  return localStorageMock
}
