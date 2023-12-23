import { screenInputFixture } from '@openapi/fixtures/ScreenFixtures'
import { ScreenInput, ScreenItemResponse } from '@openapi/generated/models'
import * as ScreenService from '@openapi/generated/services/screen-service'
import { transformScreenInput } from '@utils/ScreenTransformation'
import { SpyInstance } from 'vitest'

type UseCreateScreen = ReturnType<typeof ScreenService.useCreateScreen>
type Props = { screenInput?: ScreenInput; id?: string; opt?: Partial<UseCreateScreen> }

const mock = ({ spy, screenInput, id, opt }: Props & { spy: SpyInstance }) => {
  const input = screenInput ?? screenInputFixture
  const response = { ...transformScreenInput(input), id: id ?? '1' }
  const defaultOpt: UseCreateScreen = {
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
  }

  spy.mockReturnValue({ ...defaultOpt, ...opt })
}

export type CreateScreenMock = ReturnType<typeof useCreateScreenMock>

export const useCreateScreenMock = (screenInput?: ScreenInput, id?: string) => {
  const spy = vi.spyOn(ScreenService, 'useCreateScreen')
  mock({ spy, screenInput, id })

  return {
    spy,
    override: ({ screenInput, id, opt }: Props) => {
      mock({ spy, screenInput, id, opt })
    },
  }
}
