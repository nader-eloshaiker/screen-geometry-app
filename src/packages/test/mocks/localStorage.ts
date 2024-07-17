let storage: { [key: string]: string } = {}

export const localStorageMock = {
  getItem: vi.fn((key: string): string | null => {
    return storage[key] || null
  }),
  setItem: vi.fn((key: string, value: string): void => {
    storage[key] = value
  }),
  removeItem: vi.fn((key: string): void => {
    delete storage[key]
  }),
  clear: vi.fn((): void => {
    storage = {}
  }),
}

export const resetLocalStorage = () => {
  localStorageMock.getItem.mockClear()
  localStorageMock.setItem.mockClear()
  localStorageMock.removeItem.mockClear()
  localStorageMock.clear.mockClear()
  localStorageMock.clear()
}
