import { ScreenItemRender } from '@/app/models/screenItemRender'
import { isScreenDataEqual, toShareScreenItem } from '@screengeometry/lib-api/extended'
import { toast } from '@screengeometry/lib-ui/toaster'
import { useNavigate, useRouter } from '@tanstack/react-router'
import { useCallback, useEffect } from 'react'
import ReactGA from 'react-ga4'
import useIntl from 'react-intl/src/components/useIntl'
import { UpdateListHandler } from './useUpdateListHandler'

export type ShareHandler = { onAction: () => void }

export const useShareHandler = ({
  screens,
  incomingScreens,
  isLoading,
  updateListHandler,
}: {
  screens: ScreenItemRender[]
  incomingScreens?: ScreenItemRender[]
  isLoading: boolean
  updateListHandler: UpdateListHandler
}): ShareHandler => {
  const router = useRouter()
  const navigate = useNavigate()
  const { formatMessage } = useIntl()

  const onAction = useCallback(async () => {
    ReactGA.event({
      category: 'Button Click',
      action: 'Clicked share',
      label: 'My Screens Page',
    })

    const selectedScreensToShare = screens.filter((screen) => screen.visible).map((screen) => toShareScreenItem(screen))

    const shareLocation = router.buildLocation({ to: '/share', search: { screens: selectedScreensToShare } })
    const shareUrl = `${window.location.origin}${shareLocation.href}`
    await navigator.clipboard.writeText(shareUrl)
    toast({
      palette: 'info',
      title: formatMessage({ id: 'share.shareNotification.title', defaultMessage: 'Share Link Copied' }),
      description: formatMessage({
        id: 'share.shareNotification.description',
        defaultMessage: 'The share link has been copied to the clipboard.',
      }),
    })
  }, [formatMessage, router, screens])

  useEffect(() => {
    if (!incomingScreens?.length || isLoading || updateListHandler.isPending) return

    const missingScreens = incomingScreens.filter(
      (incoming) => !screens.some((existing) => isScreenDataEqual(existing.data, incoming))
    )

    if (missingScreens.length > 0) {
      // Clear router state immediately to prevent re-processing on refresh
      navigate({ to: '/myscreens', state: {}, replace: true })
      updateListHandler.onAction(missingScreens)
    }
  }, [incomingScreens, screens, isLoading, updateListHandler, navigate])

  return {
    onAction,
  }
}
