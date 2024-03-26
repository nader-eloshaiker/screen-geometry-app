// import { getSearchListServiceMock } from '@openapi/generated/services/search-list-service'
import '@testing-library/jest-dom'
import '../index.css'

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))
