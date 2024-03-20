// import { getSearchListServiceMock } from '@openapi/generated/services/search-list-service'
import '@testing-library/jest-dom'
// import { setupServer } from 'msw/node'
import '../index.css'

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// const server = setupServer(...getSearchListServiceMock())

// beforeAll(() => {
//   server.listen()
// })

// afterEach(() => {
//   server.resetHandlers()
// })

// afterAll(() => {
//   server.close()
// })
