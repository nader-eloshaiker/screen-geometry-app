import MatchMediaMock from '@packages/test/mocks/mockMatchMedia'
import '@testing-library/jest-dom'
import '../index.css'

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

export const mockedUseRouter = {
  back: vi.fn(),
  forward: vi.fn(),
  push: vi.fn(),
  replace: vi.fn(),
  refresh: vi.fn(),
  prefetch: vi.fn(),
}

export const mockedSearchParams = {
  get: vi.fn(),
}

export const mockedUseLocation = vi.fn()

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation')
  return {
    ...actual,
    useRouter: vi.fn(() => mockedUseRouter),
    useSearchParams: vi.fn(() => mockedSearchParams),
    usePathname: vi.fn(),
    useLocation: mockedUseLocation,
  }
})

global.window = Object.create(window)

Object.defineProperty(window, 'location', {
  value: {
    href: 'https://www.example.com',
    assign: vi.fn(),
    replace: vi.fn(),
    reload: vi.fn(),
  },
  writable: true,
})

const matchMediaMock = new MatchMediaMock()

beforeAll(() => {
  matchMediaMock.useMediaQuery('(prefers-color-scheme: dark)')
})

afterEach(() => {
  matchMediaMock.clear()
})

afterAll(() => {
  matchMediaMock.destroy()
})
