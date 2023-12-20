import { ScreenInput, ScreenItem, ScreenItemResponse } from '@openapi/generated/models'
import * as ScreenListService from '@openapi/generated/services/screen-list-service'

// const mocks = vi.hoisted(() => ({
//   useCreateScreenActionHook: vi.fn(),
// }))

// type ScreenListService = typeof import('@openapi/generated/services/screen-list-service')
// vi.mock('@openapi/generated/services/screen-list-service', async (importActual) => {
//   const actual = await importActual<ScreenListService>()
//   return {
//     __esModule: true,
//     ...actual,
//     useCreateScreenActionHook: mocks.useCreateScreenActionHook,
//   }
// })

export const useCreateScreenActionMock = (input: ScreenInput, value?: ScreenItem) => {
  const response: ScreenItem = value ?? {
    id: '1',
    data: { hSize: 47.169896067541046, vSize: 13.26653326899592, hAspectRatio: 32, vAspectRatio: 9 },
    color: { lightColor: '#000000', darkColor: '#FFFFFF' },
    render: { width: 1, height: 0.841957560650566 },
    spec: { hRes: 5120, vRes: 1440, ppi: 108.54380498674065 },
    tag: { diagonalSize: 49, aspectRatio: '32:9' },
    visible: true,
  }
  const spy = vi.spyOn(ScreenListService, 'useCreateScreenAction').mockReturnValue({
    mutate: vi.fn().mockReturnValue({ item: response } as ScreenItemResponse),
    data: { item: response },
    error: null,
    isError: false,
    isSuccess: true,
    isPending: false,
    status: 'success',
    isIdle: false,
    isPaused: false,
    context: null,
    failureCount: 0,
    reset: vi.fn(),
    failureReason: [],
    submittedAt: 0,
    variables: { data: input },
    mutateAsync: vi.fn().mockResolvedValue({ item: response } as ScreenItemResponse),
  })

  return spy
}
