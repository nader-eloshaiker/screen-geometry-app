import { screenInputFixture } from '@openapi/fixtures/ScreenFixtures'
import { ScreenInput, ScreenItemResponse } from '@openapi/generated/models'
import * as ScreenServiceModule from '@openapi/generated/services/screen-service'
import { transformScreenInput } from '@utils/ScreenTransformation'
import { MockInstance } from 'vitest'

type UseUpdateScreen = ReturnType<typeof ScreenServiceModule.useUpdateScreen>
type Props = { screenInput?: ScreenInput; id?: string; opt?: Partial<UseUpdateScreen> }

const mock = ({ spy, screenInput, id, opt }: Props & { spy: MockInstance }) => {
  const input = screenInput ?? screenInputFixture
  const response = { ...transformScreenInput(input), id: id ?? '1' }
  const defaultOpt: UseUpdateScreen = {
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
    variables: { data: input, id: id ?? '1' },
    mutateAsync: vi.fn().mockResolvedValue({ item: response } as ScreenItemResponse),
  }

  spy.mockReturnValue({ ...defaultOpt, ...opt })
}

export type UpdateScreenMock = ReturnType<typeof useUpdateScreenMock>

export const useUpdateScreenMock = (screenInput?: ScreenInput, id?: string) => {
  const spy = vi.spyOn(ScreenServiceModule, 'useUpdateScreen')
  mock({ spy, screenInput, id })

  return {
    spy,
    override: ({ screenInput, id, opt }: Props) => {
      mock({ spy, screenInput, id, opt })
    },
  }
}
