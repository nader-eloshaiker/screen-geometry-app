import { ScreenItemRender } from '@/app/models/screenItemRender'
import { toShareScreenItem } from '@screengeometry/lib-api/extended'
import { toast } from '@screengeometry/lib-ui/toaster'
import { useRouter } from '@tanstack/react-router'
import { useCallback } from 'react'
import ReactGA from 'react-ga4'
import useIntl from 'react-intl/src/components/useIntl'

export type ShareHandler = { onAction: () => void }

export const useShareHandler = ({ screens }: { screens: ScreenItemRender[] }): ShareHandler => {
  const router = useRouter()
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

  return {
    onAction,
  }
}
