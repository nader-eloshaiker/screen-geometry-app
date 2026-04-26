import { ScreenItemRender } from '@/app/models/screenItemRender'
import { useCallback, useState } from 'react'
import ReactGA from 'react-ga4'
import { ShowHandler } from '../../MyScreens/hooks/useShowHandler'

export const useLocalShowHandler = (
  screens: ScreenItemRender[],
  setScreens: React.Dispatch<React.SetStateAction<ScreenItemRender[]>>
): ShowHandler => {
  const [showVariables, setShowVariables] = useState<{ id: string } | undefined>(undefined)

  const onShow = useCallback(
    (id: string) => {
      ReactGA.event({
        category: 'Checkbox Click',
        action: 'Clicked show',
        label: 'Share Page',
      })
      const item = screens.find((screen) => screen.id === id)
      if (item) {
        item.visible = !item.visible
        setScreens([...screens])
      }
    },
    [screens, setScreens]
  )

  return {
    isPending: false,
    status: 'idle' as const,
    isSuccess: false as const,
    isError: false as const,
    isIdle: true as const,
    data: undefined,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: false as const,
    variables: showVariables,
    context: undefined,
    submittedAt: 0,
    mutate: ({ id }: { id: string }) => {
      setShowVariables({ id })
      onShow(id)
    },
    mutateAsync: async ({ id }: { id: string }) => {
      setShowVariables({ id })
      onShow(id)
      return {} as never
    },
    reset: () => setShowVariables(undefined),
  } as ShowHandler
}
